import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import API_BASE from '../config'

const ReadBook = () => {
  const { uid } = useParams()
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0e0e0e' }}>
      <div style={{ flexShrink: 0, padding: '10px 16px', borderBottom: '1px solid #2a2a2a', background: '#111111' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#7a7265', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          <ArrowLeft size={14} /> Back to Library
        </button>
      </div>

      <iframe
        src={`${API_BASE}/books/${uid}/read`}
        style={{ flex: 1, width: '100%', border: 'none', display: 'block', minHeight: 0 }}
        title="Book Reader"
      />
    </div>
  )
}

export default ReadBook