// server/auth.js
import jwt from 'jsonwebtoken'
import { User } from './models/User'
import { CaseAccess } from './models/CaseAccess'

// Simplified and cleaned up imports
export function validateJWT(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = User.findById(decoded.userId)
    if (!user) throw new Error('User not found')

    const caseAccess = CaseAccess.find({ userId: user.id })
    return { role: user.role, caseAccess }
  } catch (error) {
    console.error('JWT validation error:', error)
    throw new Error('Invalid token')
  }
}

export function verifyCaseAccess(caseId, caseAccess) {
  return caseAccess.some(access => access.caseId === caseId)
}
// This function checks if the user has access to a specific case
// and returns true or false. It can be used in the WebSocket connection handler
// to ensure that the user is authorized to access the case data they are trying to interact with.
