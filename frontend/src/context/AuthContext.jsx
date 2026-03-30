import React, { createContext, useContext, useState, useEffect } from 'react'
import { getProfile } from '../api/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const verifyToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const res = await getProfile()
      if (res.data) {
        setUser(res.data)
      } else {
        throw new Error('No user data returned')
      }
    } catch (error) {
      console.error('Profile verification failed:', error.response?.data || error)
      localStorage.removeItem('token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = (token, userData, refreshToken = null) => {
    localStorage.setItem('token', token)
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken)
    }
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  useEffect(() => {
    verifyToken()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
