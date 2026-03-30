import React from 'react'
import { Mic, MicOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVoiceSearch } from '../hooks/useVoiceSearch'

const VoiceSearch = ({ onTranscript }) => {
  const { isListening, error, startListening, stopListening } = useVoiceSearch(onTranscript)

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={isListening ? stopListening : startListening}
        className={`p-3 rounded-full transition-colors ${
          isListening ? 'bg-red-500' : 'bg-emerald-600'
        } text-white shadow-lg`}
      >
        {isListening ? <MicOff size={24} /> : <Mic size={24} />}
      </motion.button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-navy-800 text-white px-4 py-2 rounded-lg whitespace-nowrap z-50 shadow-xl flex items-center gap-2"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-2 h-2 bg-red-500 rounded-full"
            />
            <span>Listening...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-red-500 whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  )
}

export default VoiceSearch
