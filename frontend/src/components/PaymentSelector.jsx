import React from 'react'

const PaymentSelector = ({ selected, onSelect }) => {
  console.log('PaymentSelector rendering, selected:', selected)
  
  return (
    <div className="space-y-4 relative z-10">
      <h3 className="font-semibold text-lg text-navy-800">Select Payment Method</h3>
      <div className="grid grid-cols-2 gap-4">
        <button 
          type="button"
          onClick={() => {
            console.log('M-Pesa clicked')
            onSelect('mpesa')
          }}
          className={`cursor-pointer border-2 p-4 rounded-xl flex items-center justify-center font-bold transition-all ${
            selected === 'mpesa' 
            ? 'border-emerald-600 bg-emerald-50 text-emerald-600' 
            : 'border-gray-100 text-gray-400 hover:border-gray-200'
          }`}
        >
          M-Pesa
        </button>
        <button 
          type="button"
          onClick={() => {
            console.log('Stripe clicked')
            onSelect('stripe')
          }}
          className={`cursor-pointer border-2 p-4 rounded-xl flex items-center justify-center font-bold transition-all ${
            selected === 'stripe' 
            ? 'border-emerald-600 bg-emerald-50 text-emerald-600' 
            : 'border-gray-100 text-gray-400 hover:border-gray-200'
          }`}
        >
          Stripe
        </button>
      </div>
    </div>
  )
}

export default PaymentSelector
