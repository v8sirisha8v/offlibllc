import { useState } from 'react'
import { TeacherLayout } from '../../components/templates/TeacherLayout'

/**
 * UserManagement (P0 - Core)
 * Add new students + reset passwords
 * Table view of all students
 * TODO: Integrate with API (userApi.addStudent, userApi.resetPassword, userApi.getStudents)
 */
export default function UserManagement() {
  const [students, setStudents] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({ fullName: '', email: '' })

  const handleAddStudent = (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email) return

    // TODO: Replace with userApi.addStudent
    setStudents([
      ...students,
      {
        id: Date.now(),
        ...formData,
        joinedDate: new Date().toLocaleDateString(),
      },
    ])
    setFormData({ fullName: '', email: '' })
    setShowAddForm(false)
  }

  const handleResetPassword = (studentId, studentEmail) => {
    // TODO: Replace with userApi.resetPassword
    alert(`Password reset link sent to ${studentEmail}`)
  }

  return (
    <TeacherLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">User Management</h1>

        {/* Add Student Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Add New Student</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {showAddForm ? 'Cancel' : '+ Add Student'}
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Student Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
              >
                Add Student
              </button>
            </form>
          )}
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Joined</th>
                <th className="px-6 py-3 text-left text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No students added yet
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-900 font-semibold">{student.fullName}</td>
                    <td className="px-6 py-3 text-gray-700">{student.email}</td>
                    <td className="px-6 py-3 text-gray-700">{student.joinedDate}</td>
                    <td className="px-6 py-3 space-x-2">
                      <button
                        onClick={() => handleResetPassword(student.id, student.email)}
                        className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700"
                      >
                        Reset Password
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                        Remove
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
