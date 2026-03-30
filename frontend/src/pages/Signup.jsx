import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGoogleLogin } from '@react-oauth/google'
import { googleLogin, getProfile, signup } from '../api/auth'
import { useAuthContext } from '../context/AuthContext'

const Signup = () => {
  const navigate = useNavigate()
  const { user, loading, login } = useAuthContext()
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
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
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match.')
        setIsSubmitting(false)
        return
      }

      const res = await signup({
        username: `${formData.email}_${Date.now()}`, // Generate unique username
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password1: formData.password,
        password2: formData.confirmPassword,
      })
      
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
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error)
      let errorMessage = 'Signup failed. Please check your details.'
      
      if (error.response?.data) {
        const data = error.response.data
        
        // Check for specific field errors
        if (data.username && data.username.includes('already exists')) {
          errorMessage = 'An account with this email already exists. Please try logging in instead.'
        } else if (data.email && data.email.includes('already exists')) {
          errorMessage = 'An account with this email already exists. Please try logging in instead.'
        } else if (data.password1) {
          errorMessage = `Password error: ${data.password1.join(' ')}`
        } else if (data.password2) {
          errorMessage = `Password confirmation error: ${data.password2.join(' ')}`
        } else if (data.detail) {
          errorMessage = data.detail
        }
      }
      
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignup = useGoogleLogin({
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
        console.error('Google signup failed:', error.response?.data || error)
        alert('Google signup failed. Please try again.')
      }
    },
    onError: (error) => console.log('Signup Failed:', error)
  })

  return (
    <div className="container mx-auto p-8 flex justify-center items-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-navy-800">Create Account</h2>
        <p className="text-gray-500 text-center mb-8">Join PharmaStream today</p>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input 
                type="text" 
                required
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                placeholder="John" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input 
                type="text" 
                required
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                placeholder="Doe" 
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
              placeholder="name@example.com" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
              placeholder="••••••••" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input 
              type="password" 
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
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
            onClick={() => handleGoogleSignup()}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>
        </div>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-600 font-bold hover:underline">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Signup
