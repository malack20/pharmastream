import React, { useState, useRef } from 'react'
import { Upload, X, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { uploadPrescription } from '../api/prescriptions'

const UploadPrescription = ({ onUpload }) => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png' || selectedFile.type === 'application/pdf')) {
      setFile(selectedFile)
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result)
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null) // PDF preview placeholder or generic icon
      }
      setSuccess(false)
    }
  }

  const handleRemove = () => {
    setFile(null)
    setPreview(null)
    setSuccess(false)
  }

  const handleSubmit = async () => {
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await uploadPrescription(formData)
      if (onUpload) onUpload(response.data)
      setSuccess(true)
    } catch (error) {
      console.error('Upload failed:', error)
      const errorMessage = error.response?.data?.detail || 
                          error.response?.data?.image?.[0] || 
                          error.response?.data?.error ||
                          error.message ||
                          'Failed to upload prescription. Please try again.'
      setError(errorMessage)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 shadow-sm">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png,.pdf"
        className="hidden"
        id="prescription-upload"
      />

      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center cursor-pointer py-8"
          >
            <label htmlFor="prescription-upload" className="flex flex-col items-center justify-center cursor-pointer">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                <Upload size={32} />
              </div>
              <p className="text-navy-800 font-bold text-lg">Upload Your Prescription</p>
              <p className="text-gray-500 mt-2">Tap to browse files (JPG, PNG, PDF)</p>
            </label>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden border bg-gray-50 flex items-center justify-center min-h-[200px]">
              {preview ? (
                <img src={preview} alt="Prescription Preview" className="max-h-[300px] object-contain" />
              ) : (
                <div className="flex flex-col items-center p-8">
                  <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
                    📄
                  </div>
                  <p className="text-navy-800 font-medium text-center">{file.name}</p>
                  <p className="text-gray-500 text-sm mt-1">PDF Document • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
              
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6">
              {error && (
                <div className="flex items-center justify-center gap-2 text-red-600 font-bold bg-red-50 py-3 rounded-xl mb-4">
                  {error}
                </div>
              )}
              {success ? (
                <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold bg-emerald-50 py-3 rounded-xl">
                  <CheckCircle size={20} />
                  Prescription Uploaded Successfully
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={uploading || !file}
                  className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg disabled:bg-gray-400"
                >
                  {uploading ? 'Processing...' : 'Verify Prescription'}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UploadPrescription
