import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartContext } from '../context/CartContext'
import { motion, AnimatePresence } from 'framer-motion'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCartContext()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-navy-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any medicines yet.</p>
        <Link 
          to="/" 
          className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-12 text-navy-800 text-center">Your Shopping Cart</h2>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ShoppingBag size={32} />
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold text-navy-800 text-lg">{item.name}</h3>
                  <p className="text-emerald-600 font-bold">KES {item.price}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:text-emerald-600 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:text-emerald-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="font-bold text-navy-800 text-lg">
                    KES {item.price * item.quantity}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg sticky top-24">
            <h3 className="text-xl font-bold text-navy-800 mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Items ({totalItems})</span>
                <span>KES {totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="text-emerald-600 font-medium">Calculated at checkout</span>
              </div>
              <div className="h-px bg-gray-100 my-4"></div>
              <div className="flex justify-between text-xl font-bold text-navy-800">
                <span>Total</span>
                <span>KES {totalPrice}</span>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
            >
              Checkout
              <ArrowRight size={20} />
            </Link>
            
            <p className="text-xs text-center text-gray-400 mt-4 italic">
              Secure payments powered by M-Pesa & Airtel
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
