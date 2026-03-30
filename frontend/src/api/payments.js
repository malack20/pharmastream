import api from './axios'

export const initiateMpesaPayment = (data) => api.post('/payments/mpesa/', data)
export const getPayments = () => api.get('/payments/')
