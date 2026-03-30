import api from './axios'

export const uploadPrescription = (formData) => {
  // Create a new axios instance without default Content-Type for file uploads
  const uploadApi = api.create({
    baseURL: api.defaults.baseURL,
    headers: {
      ...api.defaults.headers,
      'Content-Type': undefined, // Let browser set multipart boundary
    },
  })
  
  // Copy interceptors
  uploadApi.interceptors.request.use(api.interceptors.request.handlers[0].fulfilled)
  
  return uploadApi.post('/prescriptions/', formData)
}
export const getPrescriptions = () => api.get('/prescriptions/')
