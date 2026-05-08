/**
 * TeacherLayout: Main layout for teacher/admin pages
 * Includes header and admin navigation sidebar
 */
export function TeacherLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white shadow-lg p-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">OFFLIB Admin</h1>
          <div className="flex gap-6">
            <a href="/teacher/dashboard" className="hover:text-yellow-400">
              Dashboard
            </a>
            <a href="/teacher/media-management" className="hover:text-yellow-400">
              Media
            </a>
            <a href="/teacher/user-management" className="hover:text-yellow-400">
              Users
            </a>
            <a href="/teacher/analytics" className="hover:text-yellow-400">
              Analytics
            </a>
            <a href="/account" className="hover:text-yellow-400">
              Account
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
      <footer className="bg-gray-800 text-gray-200 text-center py-4">
        <p>&copy; 2026 OFFLIB Admin. All rights reserved.</p>
      </footer>
    </div>
  )
}
