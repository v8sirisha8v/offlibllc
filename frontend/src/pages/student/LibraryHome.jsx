import { StudentLayout } from '../../components/templates/StudentLayout'

/**
 * LibraryHome (P0 - Core)
 * Main student dashboard showing:
 * - Recommended books/videos
 * - Continue reading/watching sections
 * - Search bar
 * TODO: Fetch and display media from backend (mediaApi.getRecommendedMedia)
 */
export default function LibraryHome() {
  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Library</h1>

        {/* Search Bar TODO: implement actual search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search books, videos..."
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Continue Reading/Watching Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* TODO: Map over continue reading items from API */}
            <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
              <div className="aspect-square bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
                [Book Cover]
              </div>
              <h3 className="font-semibold text-gray-800 truncate">Sample Book</h3>
              <p className="text-sm text-gray-600">by Author Name</p>
              <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                Continue Reading
              </button>
            </div>
          </div>
        </section>

        {/* Recommended Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* TODO: Map over recommended items from API */}
            <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
              <div className="aspect-square bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
                [Video Thumbnail]
              </div>
              <h3 className="font-semibold text-gray-800 truncate">Sample Video</h3>
              <p className="text-sm text-gray-600">Educational Content</p>
              <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                Watch Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </StudentLayout>
  )
}
