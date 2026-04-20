import React from 'react'
import './Login.css'
import { useState } from 'react'
import logo from '../../../assets/logo.png'
import { signInUser, signUpUser } from '../../services/authApi'

const Login = ({ onLogin }) => {

  const [signState, setSignState] = useState('Sign In');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (signState === 'Sign Up' && !username) {
      setError('Please enter username');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    // Password length check
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsSubmitting(true);

      const payload =
        signState === 'Sign Up'
          ? await signUpUser({ username, email, password })
          : await signInUser({ email, password });

      onLogin({ token: payload.token, user: payload.user });
    } catch (apiError) {
      setError(apiError.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>

          {signState === 'Sign Up' ? (
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : <> </>
          }

          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && <p style={{ color: '#e50914', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : signState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign In' ? (
            <p>New to Netflix? <span onClick={() => {
              setSignState('Sign Up');
              setError('');
              setEmail('');
              setPassword('');
            }}>Sign up now.</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => {
              setSignState('Sign In');
              setError('');
              setEmail('');
              setPassword('');
            }}>Sign in now.</span></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login