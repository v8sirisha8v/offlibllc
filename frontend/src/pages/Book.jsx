import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import API_BASE from '../config'

pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

const ReadBook = () => {
  const { uid } = useParams()
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const pdfRef = useRef(null)
  const renderTaskRef = useRef(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1.2)
  const [rendering, setRendering] = useState(false)

  // Load the PDF once
  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setLoading(true)
        setError(null)

        const pdf = await pdfjsLib.getDocument(`${API_BASE}/books/${uid}/read`).promise
        if (cancelled) return

        pdfRef.current = pdf
        setTotalPages(pdf.numPages)
        setCurrentPage(1)
      } catch (e) {
  if (!cancelled) setError(`Failed to load book: ${e?.message || e?.name || 'Unknown error'}`)
    }     
  finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [uid])

  
  // Render whenever page or scale changes
  useEffect(() => {
    if (!pdfRef.current || loading) return

    const render = async () => {
      // Cancel any in-progress render
      if (renderTaskRef.current) {
        await renderTaskRef.current.cancel().catch(() => {})
        renderTaskRef.current = null
      }

      setRendering(true)
      try {
        const page = await pdfRef.current.getPage(currentPage)
        const viewport = page.getViewport({ scale })
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')

        const task = page.render({ canvasContext: ctx, viewport })
        renderTaskRef.current = task
        await task.promise
      } catch (e) {
      if (e?.name !== 'RenderingCancelledException') {
        setError(`Failed to render page: ${e?.message || e?.name || 'Unknown error'}`)
      }
    } finally {
        renderTaskRef.current = null
        setRendering(false)
      }
    }

    render()
  }, [currentPage, scale, loading])

  const goTo = (n) => {
    if (n < 1 || n > totalPages || rendering) return
    setCurrentPage(n)
  }

  const zoom = (dir) => {
    setScale(s => Math.min(3, Math.max(0.5, parseFloat((s + dir * 0.2).toFixed(1)))))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#1a1a1a', userSelect: 'none' }}>

      {/* Toolbar */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: '#111', borderBottom: '1px solid #2a2a2a' }}>
        <button onClick={() => navigate(-1)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#888', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace' }}>
          <ArrowLeft size={14} /> Back
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Zoom */}
          <button onClick={() => zoom(-1)} disabled={scale <= 0.5}
            style={btnStyle}><ZoomOut size={15} /></button>
          <span style={{ color: '#888', fontSize: 12, fontFamily: 'monospace', minWidth: 36, textAlign: 'center' }}>
            {Math.round(scale * 100)}%
          </span>
          <button onClick={() => zoom(1)} disabled={scale >= 3}
            style={btnStyle}><ZoomIn size={15} /></button>

          <div style={{ width: 1, height: 20, background: '#2a2a2a', margin: '0 4px' }} />

          {/* Pagination */}
          <button onClick={() => goTo(currentPage - 1)} disabled={currentPage <= 1 || rendering}
            style={btnStyle}><ChevronLeft size={15} /></button>
          <span style={{ color: '#888', fontSize: 12, fontFamily: 'monospace', minWidth: 64, textAlign: 'center' }}>
            {totalPages ? `${currentPage} / ${totalPages}` : '—'}
          </span>
          <button onClick={() => goTo(currentPage + 1)} disabled={currentPage >= totalPages || rendering}
            style={btnStyle}><ChevronRight size={15} /></button>
        </div>
      </div>

      {/* Canvas area */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px 16px' }}>
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#666', marginTop: 80 }}>
            <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 13 }}>Loading book…</span>
          </div>
        )}

        {error && (
          <div style={{ color: '#e06c75', fontFamily: 'monospace', fontSize: 13, marginTop: 80 }}>{error}</div>
        )}

        {!loading && !error && (
          <div style={{ position: 'relative' }}>
            {rendering && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,26,26,0.5)', zIndex: 2 }}>
                <Loader2 size={22} color="#888" style={{ animation: 'spin 1s linear infinite' }} />
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'block', boxShadow: '0 4px 32px rgba(0,0,0,0.6)', borderRadius: 2 }} />
          </div>
        )}
      </div>

      {/* Bottom page bar (tap-friendly on mobile) */}
      {totalPages > 1 && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '12px 0', background: '#111', borderTop: '1px solid #2a2a2a' }}>
          <button onClick={() => goTo(currentPage - 1)} disabled={currentPage <= 1 || rendering}
            style={{ ...btnStyle, width: 44, height: 44, borderRadius: 10 }}><ChevronLeft size={18} /></button>
          <span style={{ color: '#666', fontFamily: 'monospace', fontSize: 13 }}>{currentPage} / {totalPages}</span>
          <button onClick={() => goTo(currentPage + 1)} disabled={currentPage >= totalPages || rendering}
            style={{ ...btnStyle, width: 44, height: 44, borderRadius: 10 }}><ChevronRight size={18} /></button>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

const btnStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 32, height: 32, background: '#222', border: '1px solid #333',
  borderRadius: 8, color: '#aaa', cursor: 'pointer',
}
btnStyle[':disabled'] = { opacity: 0.35, cursor: 'not-allowed' }

export default ReadBook