import React from 'react'
import UploadPrescription from '../components/UploadPrescription'
import { useAuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Upload = () => {
  const { user, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">Upload Prescription</h2>
        <p className="text-gray-600 mb-8 text-center">
          Our pharmacist will review your prescription and process your order within 1 hour.
        </p>
        <UploadPrescription />
      </div>
    </div>
  )
}

export default Upload
