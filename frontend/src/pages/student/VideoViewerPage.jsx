import { StudentLayout } from '../../components/templates/StudentLayout'

/**
 * VideoViewerPage (P0 - Core)
 * HTML5 video player wrapper for offline videos
 * TODO: Integrate react-player for full playback controls
 */
export default function VideoViewerPage() {
  const videoId = new URLSearchParams(window.location.search).get('id')

  return (
    <StudentLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Video Player</h1>

        <div className="bg-black rounded-lg overflow-hidden mb-6">
          <video
            controls
            width="100%"
            className="w-full"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23222'/%3E%3Ctext x='200' y='150' text-anchor='middle' dominant-baseline='middle' fill='%23999' font-size='20'%3E[Video Player]%3C/text%3E%3C/svg%3E"
          >
            <source src="" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Video Title</h2>
          <p className="text-gray-600">Video description and metadata here</p>
          <p className="text-sm text-gray-500 mt-4">Video ID: {videoId}</p>
        </div>
      </div>
    </StudentLayout>
  )
}
