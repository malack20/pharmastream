import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-2">
      {items?.map((item, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full p-4 text-left flex justify-between items-center bg-white hover:bg-gray-50"
          >
            <span className="font-medium">{item.question}</span>
            {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openIndex === index && (
            <div className="p-4 bg-gray-50 border-t text-gray-600">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FAQAccordion
