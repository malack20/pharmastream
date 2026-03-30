export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}
