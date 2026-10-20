// src/lib/format.js
export function formatPeriod(start, end) {
  if (!start) return ''
  const formatDate = (isoStr) => {
    const [year, month] = isoStr.split('-')
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    const m = month ? months[parseInt(month, 10) - 1] : ''
    return m ? `${m} ${year}` : year
  }

  const startFormatted = formatDate(start)
  const endFormatted = end ? formatDate(end) : 'PRESENT'

  return `${startFormatted} – ${endFormatted}`
}

export function isExpired(cert) {
  if (!cert || !cert.expires) return false
  const [year, month] = cert.expires.split('-')
  const expiryDate = new Date(parseInt(year, 10), month ? parseInt(month, 10) : 12, 0)
  return expiryDate < new Date()
}
