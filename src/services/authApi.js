const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const parseJsonResponse = async (response) => {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const errorMessage = payload?.message || 'Request failed';
    throw new Error(errorMessage);
  }
  return payload;
};

export const signUpUser = async ({ username, email, password }) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, email, password })
  });

  return parseJsonResponse(response);
};

export const signInUser = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  return parseJsonResponse(response);
};

export const signOutUser = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return parseJsonResponse(response);
};

export const getCurrentSession = async (token) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return parseJsonResponse(response);
};
