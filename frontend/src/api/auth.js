import api from './axios'

export const login = (credentials) => api.post('/auth/login/', credentials)
export const signup = (data) => api.post('/auth/registration/', data)
export const getProfile = () => api.get('/accounts/profile/')
export const googleLogin = (accessToken) => api.post('/accounts/google/', { access_token: accessToken })
export const refreshToken = () => api.post('/auth/token/refresh/', { refresh: localStorage.getItem('refresh_token') })
