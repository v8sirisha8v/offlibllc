import { TeacherLayout } from '../../components/templates/TeacherLayout'

/**
 * TeacherDashboard (P0 - Core)
 * Shows high-level library statistics:
 * - Total students
 * - Total media items
 * - Total uploads this month
 * - Popular items
 * TODO: Fetch stats from backend (mediaApi.getLibraryStats)
 */
export default function TeacherDashboard() {
  return (
    <TeacherLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 font-semibold mb-2">Total Students</h3>
            <p className="text-4xl font-bold text-indigo-600">--</p>
            <p className="text-sm text-gray-500 mt-2">TODO: Fetch from API</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 font-semibold mb-2">Total Media</h3>
            <p className="text-4xl font-bold text-green-600">--</p>
            <p className="text-sm text-gray-500 mt-2">Books + Videos</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 font-semibold mb-2">Uploads (This Month)</h3>
            <p className="text-4xl font-bold text-blue-600">--</p>
            <p className="text-sm text-gray-500 mt-2">New additions</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 font-semibold mb-2">Engagement Rate</h3>
            <p className="text-4xl font-bold text-purple-600">--</p>
            <p className="text-sm text-gray-500 mt-2">% of students active</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <a
            href="/teacher/media-management"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">📚 Manage Media</h2>
            <p className="text-gray-600">Upload, edit, or delete books and videos</p>
          </a>
          <a
            href="/teacher/user-management"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-2xl font-bold text-green-600 mb-2">👥 Manage Users</h2>
            <p className="text-gray-600">Add students and reset passwords</p>
          </a>
        </div>

        {/* Popular Items */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Most Accessed Items</h2>
          <div className="text-gray-500 text-center py-8">TODO: Show trending books/videos</div>
        </section>
      </div>
    </TeacherLayout>
  )
}
