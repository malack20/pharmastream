import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGoogleLogin } from '@react-oauth/google'
import { googleLogin, login as apiLogin, getProfile } from '../api/auth'
import { useAuthContext } from '../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { user, loading, login } = useAuthContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      navigate('/')
    }
  }, [user, loading, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      let res;
      // Determine if input looks like email or username
      const isEmail = email.includes('@');
      
      if (isEmail) {
        // Try login with email field first, then username
        try {
          res = await apiLogin({ email, password })
        } catch (firstError) {
          console.log('Email login failed, trying username...')
          res = await apiLogin({ username: email, password })
        }
      } else {
        // Input looks like username, try username field
        res = await apiLogin({ username: email, password })
      }
      
      const token = res.data.access_token || res.data.access || res.data.key
      const refreshToken = res.data.refresh_token || res.data.refresh
      let userData = res.data.user
      
      if (token) {
        if (!userData) {
          const profileRes = await getProfile()
          userData = profileRes.data
        }
        login(token, userData, refreshToken)
        navigate('/')
      } else {
        throw new Error('No token received')
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error)
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.non_field_errors?.[0] ||
                          error.response?.data?.email?.[0] ||
                          error.response?.data?.username?.[0] ||
                          'Login failed. Please check your credentials.'
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await googleLogin(tokenResponse.access_token)
        const token = res.data.access_token || res.data.access || res.data.key
        let userData = res.data.user
        
        if (token) {
          localStorage.setItem('token', token)
          if (!userData) {
            // Fetch user data if not in login response
            const profileRes = await getProfile()
            userData = profileRes.data
          }
          login(token, userData)
          navigate('/')
        } else {
          throw new Error('Invalid response from server')
        }
      } catch (error) {
        console.error('Google login failed:', error.response?.data || error)
        alert('Google login failed. Please try again.')
      }
    },
    onError: (error) => console.log('Login Failed:', error)
  })

  return (
    <div className="container mx-auto p-8 flex justify-center items-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-navy-800">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8">Log in to your PharmaStream account</p>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username or Email</label>
            <input 
              type="text" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
              placeholder="admin or name@example.com" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
              placeholder="••••••••" 
            />
          </div>

          <div className="text-right">
            <Link to="/forgot-password" name="forgot-password" className="text-sm text-emerald-600 hover:underline">Forgot password?</Link>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6">
          <button 
            onClick={() => handleGoogleLogin()}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Log in with Google
          </button>
        </div>

        <p className="mt-8 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-emerald-600 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login
