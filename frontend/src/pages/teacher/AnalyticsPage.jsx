import { TeacherLayout } from '../../components/templates/TeacherLayout'

/**
 * AnalyticsPage (P2 - Semi Low Priority)
 * Teacher-level analytics:
 * - Global library stats
 * - Per-student analytics and engagement metrics in table
 * - Trending content
 */
export default function AnalyticsPage() {
  return (
    <TeacherLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Analytics</h1>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 font-semibold mb-2">Total Engagements</h3>
            <p className="text-4xl font-bold text-blue-600">--</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 font-semibold mb-2">Avg Time Spent</h3>
            <p className="text-4xl font-bold text-green-600">-- min</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 font-semibold mb-2">Most Accessed Item</h3>
            <p className="text-lg font-bold text-gray-900">TODO: Fetch from API</p>
          </div>
        </div>

        {/* Student Analytics Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Student</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Items Accessed</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Time Spent</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Last Active</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                  TODO: Load student analytics from API
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </TeacherLayout>
  )
}
