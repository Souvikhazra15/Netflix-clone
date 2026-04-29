import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 5000);
const jwtSecret = process.env.JWT_SECRET;
const isVercel = process.env.VERCEL === '1';
const usersFilePath = new URL('./data/users.json', import.meta.url);
const eventsFilePath = new URL('./data/auth_events.json', import.meta.url);

if (!jwtSecret) {
  throw new Error('JWT_SECRET is missing in backend/.env');
}

const allowedOrigins = new Set([
  'http://localhost:5173',
  process.env.CLIENT_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
].filter(Boolean));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(express.json());

const ensureFileStore = async () => {
  await mkdir(new URL('./data/', import.meta.url), { recursive: true });

  for (const fileUrl of [usersFilePath, eventsFilePath]) {
    try {
      await readFile(fileUrl, 'utf8');
    } catch {
      await writeFile(fileUrl, '[]', 'utf8');
    }
  }
};

const readJsonArray = async (fileUrl) => {
  try {
    const raw = await readFile(fileUrl, 'utf8');
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeJsonArray = async (fileUrl, items) => {
  await writeFile(fileUrl, JSON.stringify(items, null, 2), 'utf8');
};

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.socket?.remoteAddress || 'unknown';
};

const resolveLocation = async (ipAddress) => {
  const cleanIp = (ipAddress || '').replace('::ffff:', '');

  if (!cleanIp || cleanIp === 'unknown' || cleanIp === '127.0.0.1' || cleanIp === '::1') {
    return {
      city: 'Localhost',
      region: 'Local',
      country: 'Local',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
      source: 'local'
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`https://ipapi.co/${cleanIp}/json/`, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Location lookup failed: ${response.status}`);
    }

    const payload = await response.json();

    return {
      city: payload.city || 'Unknown',
      region: payload.region || 'Unknown',
      country: payload.country_name || 'Unknown',
      timezone: payload.timezone || 'Unknown',
      source: 'ipapi'
    };
  } catch {
    return {
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
      timezone: 'Unknown',
      source: 'fallback'
    };
  }
};

const createToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      username: user.username
    },
    jwtSecret,
    { expiresIn: '7d' }
  );
};

const normalizeDateValue = (value) => {
  if (!value) {
    return null;
  }

  return value instanceof Date ? value.toISOString() : String(value);
};

const normalizeUserRecord = (user) => ({
  ...user,
  _id: String(user._id || randomUUID()),
  username: String(user.username || '').trim(),
  email: String(user.email || '').trim().toLowerCase(),
  isActive: Boolean(user.isActive),
  createdAt: normalizeDateValue(user.createdAt),
  updatedAt: normalizeDateValue(user.updatedAt),
  lastSignInAt: normalizeDateValue(user.lastSignInAt),
  lastSignOutAt: normalizeDateValue(user.lastSignOutAt),
  lastLoginAt: normalizeDateValue(user.lastLoginAt),
  lastLogoutAt: normalizeDateValue(user.lastLogoutAt)
});

const publicUser = (user) => ({
  id: String(user._id),
  username: user.username,
  email: user.email,
  isActive: user.isActive,
  createdAt: user.createdAt,
  lastLoginAt: user.lastLoginAt,
  lastLogoutAt: user.lastLogoutAt,
  lastSignInAt: user.lastSignInAt,
  lastSignOutAt: user.lastSignOutAt
});

const findUserByEmail = async (email) => {
  const users = await readJsonArray(usersFilePath);
  return users.find((user) => user.email === email) || null;
};

const findUserById = async (userId) => {
  const users = await readJsonArray(usersFilePath);
  return users.find((user) => String(user._id) === String(userId)) || null;
};

const insertUserRecord = async (payload) => {
  const users = await readJsonArray(usersFilePath);
  const user = normalizeUserRecord({
    _id: randomUUID(),
    ...payload
  });

  users.push(user);
  await writeJsonArray(usersFilePath, users);
  return user;
};

const updateUserById = async (userId, updateFields) => {
  const users = await readJsonArray(usersFilePath);
  const nextUsers = users.map((user) => {
    if (String(user._id) !== String(userId)) {
      return user;
    }

    return normalizeUserRecord({
      ...user,
      ...updateFields,
      _id: user._id
    });
  });

  await writeJsonArray(usersFilePath, nextUsers);
};

const findEventsByEmail = async (email, limit = 50) => {
  const events = await readJsonArray(eventsFilePath);
  return events
    .filter((event) => event.email === email)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

const authRequired = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return res.status(401).json({ message: 'Missing auth token' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const writeAuthEvent = async ({ userId, email, eventType, action, ipAddress, location, userAgent }) => {
  const events = await readJsonArray(eventsFilePath);
  events.push({
    _id: randomUUID(),
    userId: String(userId),
    email,
    eventType,
    action,
    ipAddress,
    location,
    userAgent,
    createdAt: new Date().toISOString()
  });
  await writeJsonArray(eventsFilePath, events);
};

const initializeDataStore = async () => {
  if (!initializeDataStore.promise) {
    initializeDataStore.promise = (async () => {
      await ensureFileStore();
      console.log('Using local JSON datastore.');
    })();
  }

  await initializeDataStore.promise;
};

app.use(async (_req, _res, next) => {
  try {
    await initializeDataStore();
    next();
  } catch (error) {
    next(error);
  }
});

const handleSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const now = new Date().toISOString();
    await updateUserById(user._id, {
      isActive: true,
      updatedAt: now,
      lastSignInAt: now,
      lastLoginAt: now
    });

    const ipAddress = getClientIp(req);
    const location = await resolveLocation(ipAddress);

    await writeAuthEvent({
      userId: user._id,
      email: user.email,
      eventType: 'sign_in',
      action: 'login',
      ipAddress,
      location,
      userAgent: req.headers['user-agent'] || 'unknown'
    });

    const token = createToken(user);

    return res.json({
      message: 'Signed in successfully',
      token,
      user: {
        id: String(user._id),
        username: user.username,
        email: user.email,
        lastLoginAt: now
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to sign in', error: error.message });
  }
};

const handleSignOut = async (req, res) => {
  try {
    const userId = req.user.userId;
    const now = new Date().toISOString();

    await updateUserById(userId, {
      isActive: false,
      updatedAt: now,
      lastSignOutAt: now,
      lastLogoutAt: now
    });

    const ipAddress = getClientIp(req);
    const location = await resolveLocation(ipAddress);

    await writeAuthEvent({
      userId,
      email: req.user.email,
      eventType: 'sign_out',
      action: 'logout',
      ipAddress,
      location,
      userAgent: req.headers['user-agent'] || 'unknown'
    });

    return res.json({ message: 'Signed out successfully', signedOutAt: now });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to sign out', error: error.message });
  }
};

app.get('/api/health', (_req, res) => {
  res.json({ message: 'Backend is running', timestamp: new Date().toISOString() });
});

app.post('/api/auth/sign-up', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'username, email and password are required' });
    }

    if (String(password).length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date().toISOString();

    const user = await insertUserRecord({
      username: String(username).trim(),
      email: normalizedEmail,
      passwordHash,
      isActive: true,
      createdAt: now,
      updatedAt: now,
      lastSignInAt: now,
      lastSignOutAt: null,
      lastLoginAt: now,
      lastLogoutAt: null
    });

    const ipAddress = getClientIp(req);
    const location = await resolveLocation(ipAddress);

    await writeAuthEvent({
      userId: user._id,
      email: normalizedEmail,
      eventType: 'sign_in',
      action: 'login',
      ipAddress,
      location,
      userAgent: req.headers['user-agent'] || 'unknown'
    });

    const token = createToken(user);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: String(user._id),
        username: user.username,
        email: user.email,
        lastLoginAt: now
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
});

app.post('/api/auth/sign-in', handleSignIn);
app.post('/api/auth/login', handleSignIn);
app.post('/api/auth/sign-out', authRequired, handleSignOut);
app.post('/api/auth/logout', authRequired, handleSignOut);

app.get('/api/auth/me', authRequired, async (req, res) => {
  try {
    const user = await findUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      user: publicUser(user)
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to get user session', error: error.message });
  }
});

app.get('/api/auth/activity/:email', async (req, res) => {
  try {
    const email = String(req.params.email || '').trim().toLowerCase();
    if (!email) {
      return res.status(400).json({ message: 'email param is required' });
    }

    const events = await findEventsByEmail(email, 50);

    return res.json({
      email,
      totalEvents: events.length,
      events: events.map((event) => ({
        id: String(event._id),
        eventType: event.eventType,
        action: event.action,
        ipAddress: event.ipAddress,
        location: event.location,
        time: event.createdAt,
        userAgent: event.userAgent
      }))
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch activity', error: error.message });
  }
});

const startServer = async () => {
  await initializeDataStore();

  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
};

if (!isVercel) {
  startServer();
}

export default app;
