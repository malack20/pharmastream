import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for medicines..."
        value={value}
        onChange={onChange}
        className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-sm border-gray-200"
      />
      <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
    </div>
  )
}

export default SearchBar
