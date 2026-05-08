/**
 * Auth API Service
 * Handles login, signup, password reset, and session management
 * TODO: Replace with actual backend endpoint URLs
 */

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

export const authApi = {
  /**
   * Login user with email and password
   */
  async login(email, password) {
    // TODO: Replace with real API call
    // const res = await fetch(`${API_BASE}/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })
    // return res.json()

    return { email, id: '1', fullName: email.split('@')[0] }
  },

  /**
   * Signup new user
   */
  async signup(fullName, email, password, role) {
    // TODO: Replace with real API call
    return { email, id: '1', fullName, role }
  },

  /**
   * Reset password request
   */
  async resetPassword(email) {
    // TODO: Replace with real API call
    return { message: 'Password reset link sent' }
  },

  /**
   * Logout (clear session on backend)
   */
  async logout() {
    // TODO: Replace with real API call
    return { message: 'Logged out' }
  },
}
