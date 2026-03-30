import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, LogOut } from 'lucide-react'
import { useAuthContext } from '../context/AuthContext'
import { useCartContext } from '../context/CartContext'

const Navbar = () => {
  const { user, logout } = useAuthContext()
  const { totalItems } = useCartContext()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-navy-800 flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-lg">P</div>
          PharmaStream
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">Home</Link>
          <Link to="/products" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">Medicines</Link>
          <Link to="/faq" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="p-2 text-gray-600 hover:text-emerald-600 transition-colors relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>
          
          <div className="h-6 w-px bg-gray-200 mx-2"></div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 text-navy-800 font-medium">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={18} className="text-gray-500" />
                </div>
                <span className="hidden sm:inline">{user.username}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Log Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">Log In</Link>
              <Link to="/signup" className="bg-emerald-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-50">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
