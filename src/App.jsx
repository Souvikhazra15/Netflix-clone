import React from 'react'
import Home from './pages/Home/Home'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { useState, useEffect } from 'react'
import { getCurrentSession, signOutUser } from './services/authApi'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const initializeSession = async () => {
      const storedToken = localStorage.getItem('netflixToken')
      if (!storedToken) {
        setIsLoading(false)
        return
      }

      try {
        const sessionResponse = await getCurrentSession(storedToken)
        setCurrentUser(sessionResponse.user)
        setIsLoggedIn(true)
      } catch {
        localStorage.removeItem('netflixToken')
        localStorage.removeItem('netflixUser')
        setCurrentUser(null)
        setIsLoggedIn(false)
      } finally {
        setIsLoading(false)
      }
    }

    initializeSession()
  }, [])

  const handleLogin = ({ token, user }) => {
    localStorage.setItem('netflixToken', token)
    localStorage.setItem('netflixUser', 'true')
    setCurrentUser(user)
    setIsLoggedIn(true)
  }

  const handleLogout = async () => {
    const storedToken = localStorage.getItem('netflixToken')
    if (storedToken) {
      try {
        await signOutUser(storedToken)
      } catch {
        // If backend sign-out fails, still clear local session to keep UI usable.
      }
    }

    localStorage.removeItem('netflixToken')
    localStorage.removeItem('netflixUser')
    setCurrentUser(null)
    setIsLoggedIn(false)
  }

  if (isLoading) {
    return <div style={{ width: '100%', height: '100vh', background: 'black' }}></div>
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home onLogout={handleLogout} currentUser={currentUser} /> : <Navigate to="/login" />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/player/:id" element={isLoggedIn ? <Player /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
