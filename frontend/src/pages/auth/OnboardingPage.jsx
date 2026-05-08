import { StudentLayout } from '../../components/templates/StudentLayout'

/**
 * OnboardingPage (P2 - Semi Low Priority)
 * New student setup flow:
 * - Interest selection
 * - Avatar upload/selection
 * - Profile setup
 * Redirects to LibraryHome on complete
 */
export default function OnboardingPage() {
  return (
    <StudentLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to OFFLIB!</h1>
        <div className="bg-white rounded-lg shadow p-8 space-y-6">
          <p className="text-gray-700 text-lg">Let's set up your profile to get you started.</p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Select Your Interests</h2>
            <div className="space-y-3">
              {['Science', 'Mathematics', 'Literature', 'History', 'Arts', 'Technology'].map((interest) => (
                <label key={interest} className="flex items-center">
                  <input type="checkbox" className="w-5 h-5 text-indigo-600" />
                  <span className="ml-3 text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Choose an Avatar</h2>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <label key={i} className="cursor-pointer">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
                    Avatar {i}
                  </div>
                  <input type="radio" name="avatar" className="hidden" />
                </label>
              ))}
            </div>
          </section>

          <button className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">
            Continue to Library
          </button>
        </div>
      </div>
    </StudentLayout>
  )
}
