import { useState, useEffect } from 'react'

export const useCart = () => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  return { cart, addToCart, removeFromCart }
}
