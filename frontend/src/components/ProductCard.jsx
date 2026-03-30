import React from 'react'
import { motion } from 'framer-motion'
import { FileText, ShoppingCart } from 'lucide-react'
import { useCartContext } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCartContext()

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative h-56 bg-gray-50 overflow-hidden">
        {product?.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ShoppingCart size={48} />
          </div>
        )}
        {product?.is_prescription_required && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <FileText size={12} />
            PRESCRIPTION REQUIRED
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-xs font-bold text-emerald-600 mb-1 uppercase tracking-wider">
          {product?.category || 'General'}
        </div>
        <h3 className="font-bold text-navy-800 text-lg mb-2 line-clamp-1">
          {product?.name || 'Sample Medicine'}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {product?.description || 'Effective relief for common symptoms and health maintenance.'}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-xs text-gray-400 block">Price</span>
            <span className="text-xl font-bold text-navy-800">
              KES {product?.price || '0.00'}
            </span>
          </div>
          <button 
            onClick={() => addToCart({ ...product, price: Number(product.price) })}
            className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
