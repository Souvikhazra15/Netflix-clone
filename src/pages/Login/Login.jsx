import React from 'react'
import './Login.css'
import { useState } from 'react'
import logo from '../../../assets/logo.png'

const Login = () => {

  const [signState, setSignState] = useState('Sign In');

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="Logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form action="">

          {signState === 'Sign Up' ? <input type="text" placeholder="Username" /> : <> </>}

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign In' ? <p>New to Netflix? <span onClick={() =>
            setSignState('Sign Up')}>Sign up now.</span></p> : <p>Already have an account? <span onClick={() =>
              setSignState('Sign In')}>Sign in now.</span></p>}
        </div>
      </div>
    </div>
  )
}

export default Login