import React from 'react'
import { Filter } from 'lucide-react'

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'painkillers', label: 'Painkillers' },
  { value: 'antibiotics', label: 'Antibiotics' },
  { value: 'supplements', label: 'Supplements & Vitamins' },
  { value: 'chronic', label: 'Chronic Medication' },
  { value: 'first_aid', label: 'First Aid' },
  { value: 'skincare', label: 'Skincare' },
  { value: 'general', label: 'General Health' },
]

const CategoryFilter = ({ selected, onSelect }) => {
  return (
    <div className="relative inline-block w-full sm:w-64">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Filter size={18} />
      </div>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm font-medium text-navy-800"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  )
}

export default CategoryFilter
