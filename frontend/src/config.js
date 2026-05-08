// In development, Vite serves from the same host the browser used,
// so we can use a relative URL. In production (served by FastAPI), same thing.
const API_BASE = import.meta.env.VITE_API_URL || '';

export default API_BASE;