import { StudentLayout } from '../../components/templates/StudentLayout'

/**
 * HistoryPage (P2 - Semi Low Priority)
 * Shows:
 * - Reading/watch history (with last accessed time)
 * - "Watch later" / bookmark list
 * - Resume reading/watching
 */
export default function HistoryPage() {
  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My History</h1>

        <div className="space-y-8">
          {/* Reading History */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reading History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
                <div className="flex gap-4">
                  <div className="w-16 h-20 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center text-gray-400">
                    [Cover]
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">Book title here</h3>
                    <p className="text-sm text-gray-600">Last read: 2 hours ago</p>
                    <button className="mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-gray-500 text-center py-8">TODO: Show reading history items</div>
          </section>

          {/* Watch Later */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Watch Later</h2>
            <div className="text-gray-500 text-center py-8">TODO: Show bookmarked/watch-later items</div>
          </section>
        </div>
      </div>
    </StudentLayout>
  )
}
