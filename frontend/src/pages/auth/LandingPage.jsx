import { AuthLayout } from '../../components/templates/AuthLayout'

/**
 * LandingPage (P3 - Low Priority)
 * Informational landing page explaining OFFLIB
 * Links to Login and Signup
 */
export default function LandingPage() {
  return (
    <AuthLayout>
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-indigo-600 mb-4">Welcome to OFFLIB</h1>
        <p className="text-gray-700 text-lg">
          An offline library solution for interactive learning. Access books and videos anytime, anywhere.
        </p>

        <div className="space-y-4 mt-8">
          <a
            href="/auth/login"
            className="block px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </a>
          <a
            href="/auth/signup"
            className="block px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </a>
        </div>

        <div className="mt-12 space-y-4 text-left">
          <h2 className="text-2xl font-semibold text-gray-900">Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Offline access to your library</li>
            <li>✅ Support for books (PDF/EPUB) and videos</li>
            <li>✅ Bookmarks and reading history</li>
            <li>✅ Teacher tools for content management</li>
          </ul>
        </div>
      </div>
    </AuthLayout>
  )
}
