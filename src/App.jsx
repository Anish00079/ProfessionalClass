import React, { useState } from 'react'
import Login from './components/Login'
import Home from './components/Home'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const handleLogin = (loginData) => {
    setUser(loginData)
    setIsLoggedIn(true)
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal)
  }

  return isLoggedIn ? (
    <Home user={user} onLogout={handleLogout} onLoginClick={toggleLoginModal} />
  ) : (
    <Login onLogin={handleLogin} />
  )
}

export default App