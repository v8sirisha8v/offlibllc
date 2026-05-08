import { StudentLayout } from '../../components/templates/StudentLayout'

/**
 * ItemDetailPage (P2 - Semi Low Priority)
 * Details/metadata view for a book or video before opening viewer
 * Shows: title, author, description, ratings, duration/pages, etc.
 */
export default function ItemDetailPage() {
  const itemId = new URLSearchParams(window.location.search).get('id')

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto">
        <button className="text-indigo-600 hover:underline mb-6">← Back to Library</button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Thumbnail/Cover */}
          <div>
            <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center text-gray-400 mb-4">
              [Cover Image]
            </div>
            <button className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">
              Open Item
            </button>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Item Title</h1>
            <p className="text-gray-600 text-lg mb-4">by Author Name</p>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Type</label>
                <p className="text-gray-900">Book / Video</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <p className="text-gray-700 leading-relaxed">TODO: Display item description and metadata</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Pages / Duration</label>
                  <p className="text-gray-900">-- pages / -- min</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Rating</label>
                  <p className="text-gray-900">⭐ 4.5 / 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
