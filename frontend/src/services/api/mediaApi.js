/**
 * Media API Service
 * Handles fetching, uploading, and managing media (books/videos)
 * TODO: Replace with actual backend endpoint URLs
 */

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

export const mediaApi = {
  /**
   * Get recommended media for student
   */
  async getRecommendedMedia(studentId) {
    // TODO: Fetch from backend
    return []
  },

  /**
   * Get student's continue reading/watching list
   */
  async getContinueMedia(studentId) {
    // TODO: Fetch from backend
    return []
  },

  /**
   * Search media with filters
   */
  async searchMedia(query, filters = {}) {
    // TODO: Fetch from backend
    return []
  },

  /**
   * Get details for a specific media item
   */
  async getMediaDetail(mediaId) {
    // TODO: Fetch from backend
    return null
  },

  /**
   * Upload new media file (teacher only)
   */
  async uploadMedia(formData) {
    // TODO: Replace with real API call
    // const res = await fetch(`${API_BASE}/media/upload`, {
    //   method: 'POST',
    //   body: formData, // includes file and metadata
    // })
    // return res.json()

    return { message: 'Media uploaded' }
  },

  /**
   * Get all media in library (teacher view)
   */
  async getLibraryMedia() {
    // TODO: Fetch from backend
    return []
  },

  /**
   * Get overall library statistics (for dashboard)
   */
  async getLibraryStats() {
    // TODO: Fetch from backend
    return {
      totalStudents: 0,
      totalMedia: 0,
      monthlyUploads: 0,
      engagementRate: 0,
    }
  },

  /**
   * Delete a media item
   */
  async deleteMedia(mediaId) {
    // TODO: Replace with real API call
    return { message: 'Media deleted' }
  },
}
