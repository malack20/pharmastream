import axios from 'axios'
import { refreshToken } from './auth'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refresh_token = localStorage.getItem('refresh_token')
        if (refresh_token) {
          const response = await axios.post('/api/auth/token/refresh/', {
            refresh: refresh_token
          })

          const newToken = response.data.access
          localStorage.setItem('token', newToken)

          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${newToken}`

          // Retry the original request
          return instance(originalRequest)
        }
      } catch (refreshError) {
        // Refresh token is invalid, logout user
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default instance
