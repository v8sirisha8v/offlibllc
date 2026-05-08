import { useState } from 'react'
import { TeacherLayout } from '../../components/templates/TeacherLayout'

/**
 * MediaManagement (P0 - Core)
 * Upload new media with metadata extraction
 * Edit/delete existing books and videos in table format
 * TODO: Integrate with mediaApi.uploadMedia, mediaApi.getMediaList, etc.
 */
export default function MediaManagement() {
  const [mediaList, setMediaList] = useState([])
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      // TODO: Replace with mediaApi.uploadMedia(file)
      // For now just add a placeholder to table
      setMediaList([
        ...mediaList,
        {
          id: Date.now(),
          title: file.name,
          type: file.type.includes('video') ? 'Video' : 'Book',
          uploadedAt: new Date().toLocaleDateString(),
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        },
      ])
    } finally {
      setUploading(false)
    }
  }

  return (
    <TeacherLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Media Management</h1>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upload New Media</h2>
          <div className="border-2 border-dashed border-indigo-400 rounded-lg p-12 text-center">
            <p className="text-gray-600 mb-4">Drag & drop files or click to upload</p>
            <input
              type="file"
              onChange={handleUpload}
              disabled={uploading}
              accept=".pdf,.epub,.mp4,.webm"
              className="hidden"
              id="media-upload"
            />
            <label htmlFor="media-upload">
              <button
                as="span"
                disabled={uploading}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
              >
                {uploading ? 'Uploading...' : 'Select File'}
              </button>
            </label>
          </div>
        </div>

        {/* Media Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Type</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Uploaded</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Size</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mediaList.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No media uploaded yet
                  </td>
                </tr>
              ) : (
                mediaList.map((media) => (
                  <tr key={media.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-900">{media.title}</td>
                    <td className="px-6 py-3 text-gray-700">{media.type}</td>
                    <td className="px-6 py-3 text-gray-700">{media.uploadedAt}</td>
                    <td className="px-6 py-3 text-gray-700">{media.size}</td>
                    <td className="px-6 py-3 space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </TeacherLayout>
  )
}
