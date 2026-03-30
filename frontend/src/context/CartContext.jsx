import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const productId = String(product.id)
      const existing = prev.find(item => String(item.id) === productId)
      if (existing) {
        return prev.map(item => 
          String(item.id) === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        )
      }
      return [...prev, { ...product, id: productId, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    const idStr = String(productId)
    setCart(prev => prev.filter(item => String(item.id) !== idStr))
  }

  const updateQuantity = (productId, quantity) => {
    const idStr = String(productId)
    setCart(prev => prev.map(item => 
      String(item.id) === idStr ? { ...item, quantity: Math.max(1, quantity) } : item
    ))
  }

  const clearCart = () => setCart([])

  const totalItems = cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
  const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) * (Number(item.quantity) || 1)), 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext)
