export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 9) return `+254 ${cleaned}`
  if (cleaned.length === 12) return `+${cleaned}`
  return phone
}
