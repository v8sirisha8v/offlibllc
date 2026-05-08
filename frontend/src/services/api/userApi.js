/**
 * User Management API Service
 * Handles student/user operations (add, remove, reset password, fetch list)
 * TODO: Replace with actual backend endpoint URLs
 */

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

export const userApi = {
  /**
   * Get all students (teacher view)
   */
  async getStudents() {
    // TODO: Fetch from backend
    return []
  },

  /**
   * Add new student
   */
  async addStudent(fullName, email) {
    // TODO: Replace with real API call
    return { id: '1', fullName, email, joinedDate: new Date().toISOString() }
  },

  /**
   * Remove/delete a student
   */
  async removeStudent(studentId) {
    // TODO: Replace with real API call
    return { message: 'Student removed' }
  },

  /**
   * Reset password for a student
   */
  async resetPassword(studentId, studentEmail) {
    // TODO: Replace with real API call
    return { message: `Password reset link sent to ${studentEmail}` }
  },

  /**
   * Get student details
   */
  async getStudent(studentId) {
    // TODO: Fetch from backend
    return null
  },
}
