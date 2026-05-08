import { useParams } from 'react-router-dom'
import { StudentLayout } from '../../components/templates/StudentLayout'

/**
 * BookViewerPage (P0 - Core)
 * Displays PDF/EPUB with:
 * - Bookmark support
 * - Font size controls
 * - Dark mode toggle
 * TODO: Integrate react-pdf or react-epub-viewer to render actual files
 */
export default function BookViewerPage() {
  const { bookId } = useParams()

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Book Viewer</h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Font Size +
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Font Size -
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              🌙 Dark Mode
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              📌 Bookmark
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 min-h-96 text-center text-gray-400">
          <p>Book content will be rendered here (react-pdf/react-epub-viewer)</p>
          <p className="text-sm mt-2">Book ID: {bookId}</p>
        </div>
      </div>
    </StudentLayout>
  )
}
