import { StudentLayout } from '../../components/templates/StudentLayout'

/**
 * SearchAndFilterPage (P2 - Semi Low Priority)
 * Advanced search with multiple filters:
 * - Type (book/video), subject, date range, language, etc.
 * TODO: Implement filtering logic + mediaApi.searchMedia
 */
export default function SearchAndFilterPage() {
  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Search & Filter</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <aside className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Filters</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>All</option>
                  <option>Books</option>
                  <option>Videos</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>All Subjects</option>
                  <option>Science</option>
                  <option>Mathematics</option>
                  <option>Literature</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Date Range</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>

              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600 text-lg">TODO: Display filtered search results here</p>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}
