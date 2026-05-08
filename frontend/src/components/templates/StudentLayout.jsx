/**
 * StudentLayout: Main layout for student pages (Library, Viewer, History, etc.)
 * Includes header and navigation sidebar
 */
export function StudentLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm border-b border-gray-200 p-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">OFFLIB</h1>
          <div className="flex gap-4">
            <a href="/student/library" className="text-gray-700 hover:text-indigo-600">
              Library
            </a>
            <a href="/student/history" className="text-gray-700 hover:text-indigo-600">
              History
            </a>
            <a href="/account" className="text-gray-700 hover:text-indigo-600">
              Account
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
      <footer className="bg-gray-800 text-gray-200 text-center py-4">
        <p>&copy; 2026 OFFLIB. All rights reserved.</p>
      </footer>
    </div>
  )
}
