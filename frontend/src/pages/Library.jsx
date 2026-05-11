import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  BookOpen, Film, Upload, X, Trash2, Loader2,
  Pencil, Check, Search, Plus, Eye, Tag, Filter, Music, LogOut,
  UserPlus, ShieldCheck
} from "lucide-react";

import API_BASE from '../config';

const BOOKS_API = `${API_BASE}/books`;
const VIDEOS_API = `${API_BASE}/videos`;
const AUDIO_API = `${API_BASE}/audio`;
const TAGS_API = `${API_BASE}/tags`;
const AUTH_API = `${API_BASE}/auth`;

const TagDropdown = ({ allTags, selectedTags, onToggle, onClear }) => {
  const [open, setOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const ref = React.useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = allTags.filter(t => t.name.toLowerCase().includes(tagSearch.toLowerCase()));

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(p => !p)}
        style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", background: selectedTags.length > 0 ? "#F5EDD8" : "#F7F5F2", border: selectedTags.length > 0 ? "1.5px solid #B8922A" : "1px solid #E8E4DE", borderRadius: 10, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: selectedTags.length > 0 ? "#B8922A" : "#6B6560", cursor: "pointer", whiteSpace: "nowrap" }}>
        <Tag size={13} />
        {selectedTags.length > 0 ? `${selectedTags.length}` : ""}
        <span style={{ fontSize: 10, marginLeft: 2 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 100, background: "#fff", border: "1px solid #E8E4DE", borderRadius: 12, boxShadow: "0 8px 32px rgba(28,26,23,0.12)", minWidth: 200, overflow: "hidden" }}>
          <div style={{ padding: "10px 12px", borderBottom: "1px solid #E8E4DE" }}>
            <input autoFocus value={tagSearch} onChange={e => setTagSearch(e.target.value)} placeholder="Search tags..."
              style={{ width: "100%", padding: "7px 10px", border: "1px solid #E8E4DE", borderRadius: 8, fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif", outline: "none", color: "#1C1A17", boxSizing: "border-box" }} />
          </div>
          <div style={{ maxHeight: 220, overflowY: "auto" }}>
            {filtered.length === 0
              ? <p style={{ padding: "12px 14px", fontSize: 12, color: "#A09890", margin: 0, fontFamily: "'IBM Plex Mono', monospace" }}>No tags found</p>
              : filtered.map(tag => {
                  const active = selectedTags.includes(tag.name);
                  return (
                    <button key={tag.id} onClick={() => onToggle(tag.name)}
                      style={{ width: "100%", textAlign: "left", padding: "9px 14px", border: "none", background: active ? "#F5EDD8" : "transparent", color: active ? "#B8922A" : "#1C1A17", cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: active ? 600 : 400, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {tag.name}
                      {active && <Check size={12} color="#B8922A" />}
                    </button>
                  );
                })
            }
          </div>
          {selectedTags.length > 0 && (
            <div style={{ padding: "8px 12px", borderTop: "1px solid #E8E4DE" }}>
              <button onClick={() => { onClear(); setOpen(false); }}
                style={{ width: "100%", padding: "7px 0", background: "#F7F5F2", border: "1px solid #E8E4DE", borderRadius: 8, fontSize: 12, color: "#A09890", cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                <X size={10} /> Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── ADD ADMIN MODAL ───────────────────────────────────────────────────────────
const AddAdminModal = ({ onClose }) => {
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({ username: "", password: "", first_name: "", last_name: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");

  const inputStyle = { width: "100%", padding: "10px 14px", border: "1px solid #E8E4DE", borderRadius: 10, fontSize: 13, color: "#1C1A17", outline: "none", boxSizing: "border-box", fontFamily: "'IBM Plex Sans', sans-serif" };
  const labelStyle = { fontSize: 12, color: "#6B6560", display: "block", marginBottom: 6, fontFamily: "'IBM Plex Sans', sans-serif" };

  const isValid = formData.first_name.trim() && formData.last_name.trim() && formData.username.trim().length >= 4 && formData.password.length >= 15;

  const handleCreate = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${AUTH_API}/signup`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      if (!res.ok) { const d = await res.json().catch(() => null); throw new Error(d?.detail ?? "Signup failed."); }
      const data = await res.json();
      await fetch(`${AUTH_API}/make-admin/${formData.username}`, { method: "POST" });
      setRecoveryCode(data.recovery_code || "N/A");
      setStep("recovery");
    } catch (e) { setError(e.message || "Failed to create admin."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(28,26,23,0.4)", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 440, margin: "0 16px", boxShadow: "0 32px 80px rgba(28,26,23,0.18)", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}>
        {step === "recovery" ? (
          <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 20, textAlign: "center" }}>
            <div>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "#F0FAF4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <ShieldCheck size={22} color="#2D7A4F" />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: "#1C1A17", margin: "0 0 8px" }}>Admin Created!</h2>
              <p style={{ fontSize: 13, color: "#6B6560", margin: 0, lineHeight: 1.5 }}>Give <strong>{formData.username}</strong> their recovery code.</p>
            </div>
            <div style={{ background: "#F5EDD8", border: "1.5px solid #D4A93A", borderRadius: 14, padding: "20px 24px" }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#A09890", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>Recovery Code</p>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 700, color: "#B8922A", letterSpacing: "0.25em" }}>{recoveryCode}</div>
            </div>
            <div style={{ background: "#FEF2F0", border: "1px solid #FADADD", borderRadius: 10, padding: "12px 16px", textAlign: "left" }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#D94F3D", margin: 0, lineHeight: 1.6 }}>⚠ This code will not be shown again.</p>
            </div>
            <button onClick={onClose} style={{ padding: "13px 0", background: "#B8922A", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ padding: "22px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "#F5EDD8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <UserPlus size={14} color="#B8922A" />
                </div>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: "#1C1A17" }}>Add Admin</span>
              </div>
              <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid #E8E4DE", background: "#F7F5F2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B6560" }}>
                <X size={15} />
              </button>
            </div>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ padding: "10px 14px", background: "#F5EDD8", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
                <ShieldCheck size={13} color="#B8922A" />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#B8922A" }}>This account will have full admin access</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>First name</label>
                  <input value={formData.first_name} onChange={e => setFormData(p => ({ ...p, first_name: e.target.value }))} placeholder="First..." style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Last name</label>
                  <input value={formData.last_name} onChange={e => setFormData(p => ({ ...p, last_name: e.target.value }))} placeholder="Last..." style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Username</label>
                <input value={formData.username} onChange={e => setFormData(p => ({ ...p, username: e.target.value }))} placeholder="min 4 characters..." style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPassword ? "text" : "password"} value={formData.password} onChange={e => setFormData(p => ({ ...p, password: e.target.value }))} placeholder="min 15 characters..." style={{ ...inputStyle, paddingRight: 40 }} />
                  <button type="button" onClick={() => setShowPassword(p => !p)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#A09890", padding: 0, display: "flex" }}>
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
                {formData.password.length > 0 && formData.password.length < 15 && (
                  <p style={{ fontSize: 11, color: "#D94F3D", margin: "4px 0 0", fontFamily: "'IBM Plex Mono', monospace" }}>{15 - formData.password.length} more characters needed</p>
                )}
              </div>
              {error && <div style={{ padding: "10px 14px", background: "#FEF2F0", border: "1px solid #FADADD", borderRadius: 10, fontSize: 12, color: "#D94F3D", fontFamily: "'IBM Plex Mono', monospace" }}>{error}</div>}
              <button onClick={handleCreate} disabled={loading || !isValid}
                style={{ padding: "13px 0", background: loading || !isValid ? "#E8E4DE" : "#B8922A", color: loading || !isValid ? "#A09890" : "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: loading || !isValid ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'IBM Plex Sans', sans-serif" }}>
                {loading ? <><Loader2 size={14} className="spin" /> Creating...</> : <><UserPlus size={14} /> Create Admin Account</>}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── UPLOAD MODAL ──────────────────────────────────────────────────────────────
const UploadModal = ({ onClose, onSuccess, type }) => {
  const tab = type;
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileSelect = (e) => { setFiles(Array.from(e.target.files)); e.target.value = ""; };
  const removeFile = (i) => setFiles(prev => prev.filter((_, idx) => idx !== i));
  const acceptType = tab === "book" ? ".pdf,.epub" : tab === "audio" ? ".mp3,.wav,.ogg,.m4a,.aac,.flac" : "video/*";

  const upload = async () => {
    if (files.length === 0) { setError("No files selected."); return; }
    setLoading(true); setError("");
    try {
      if (tab === "book") {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          if (tags.trim()) formData.append("tags", tags.trim());
          const res = await fetch(`${BOOKS_API}/upload`, { method: "POST", body: formData });
          if (!res.ok) { const data = await res.json().catch(() => null); throw new Error(data?.detail ?? `HTTP ${res.status}`); }
        }
      } else if (tab === "audio") {
        if (files.length === 1) {
          const formData = new FormData();
          formData.append("file", files[0]);
          if (tags.trim()) formData.append("tags", tags.trim());
          const res = await fetch(`${AUDIO_API}/upload`, { method: "POST", body: formData });
          if (!res.ok) { const data = await res.json().catch(() => null); throw new Error(data?.detail ?? `HTTP ${res.status}`); }
        } else {
          const formData = new FormData();
          files.forEach(f => formData.append("files", f));
          const res = await fetch(`${AUDIO_API}/upload_multiple`, { method: "POST", body: formData });
          if (!res.ok) { const data = await res.json().catch(() => null); throw new Error(data?.detail ?? `HTTP ${res.status}`); }
        }
      } else {
        if (files.length === 1) {
          const formData = new FormData();
          formData.append("file", files[0]);
          formData.append("title", files[0].name.replace(/\.[^/.]+$/, ""));
          if (tags.trim()) formData.append("tags", tags.trim());
          const res = await fetch(`${VIDEOS_API}/upload`, { method: "POST", body: formData });
          if (!res.ok) { const data = await res.json().catch(() => null); throw new Error(data?.detail ?? `HTTP ${res.status}`); }
        } else {
          const formData = new FormData();
          files.forEach(f => formData.append("files", f));
          const res = await fetch(`${VIDEOS_API}/upload_multiple`, { method: "POST", body: formData });
          if (!res.ok) { const data = await res.json().catch(() => null); throw new Error(data?.detail ?? `HTTP ${res.status}`); }
        }
      }
      onSuccess(); onClose();
    } catch (e) {
      setError(e.message || "Upload failed.");
    } finally { setLoading(false); }
  };

  const TabIcon = tab === "book" ? BookOpen : tab === "audio" ? Music : Film;
  const tabLabel = tab === "book" ? "Add Book" : tab === "audio" ? "Add Audio" : "Add Video";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(28,26,23,0.4)", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 440, margin: "0 16px", boxShadow: "0 32px 80px rgba(28,26,23,0.18)", overflow: "hidden" }}>
        <div style={{ padding: "22px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: "#1C1A17" }}>{tabLabel}</span>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid #E8E4DE", background: "#F7F5F2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B6560" }}>
            <X size={15} />
          </button>
        </div>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ position: "relative", background: "#FAFAF9", border: "2px dashed #D4CFC8", borderRadius: 14, padding: "28px 20px", textAlign: "center", cursor: "pointer" }}>
            <input type="file" accept={acceptType} multiple onChange={handleFileSelect}
              style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }} />
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#F5EDD8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
              <TabIcon size={18} color="#B8922A" />
            </div>
            {files.length > 0
              ? <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#B8922A", fontWeight: 500, margin: 0 }}>{files.length} file{files.length !== 1 ? "s" : ""} selected</p>
              : <>
                  <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#1C1A17", fontWeight: 500, margin: "0 0 3px" }}>Click to browse</p>
                  <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: "#A09890", margin: 0 }}>
                    {tab === "book" ? "PDF or EPUB" : tab === "audio" ? "MP3, WAV, OGG, M4A, AAC, FLAC" : "Video files"}
                  </p>
                </>
            }
          </div>

          {files.length > 0 && (
            <div style={{ border: "1px solid #E8E4DE", borderRadius: 12, overflow: "hidden", maxHeight: 140, overflowY: "auto" }}>
              {files.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: i < files.length - 1 ? "1px solid #E8E4DE" : "none" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#1C1A17", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#A09890", flexShrink: 0 }}>{(f.size / (1024 * 1024)).toFixed(1)} MB</span>
                  <button onClick={() => removeFile(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#A09890", padding: 0, display: "flex" }}><X size={12} /></button>
                </div>
              ))}
            </div>
          )}

          <div>
            <label style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: "#6B6560", display: "block", marginBottom: 6 }}>Tags (optional, comma separated)</label>
            <input type="text" placeholder="history, science, fiction..." value={tags} onChange={e => setTags(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", border: "1px solid #E8E4DE", borderRadius: 10, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#1C1A17", outline: "none", boxSizing: "border-box" }} />
          </div>

          {error && <div style={{ padding: "10px 14px", background: "#FEF2F0", border: "1px solid #FADADD", borderRadius: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#D94F3D" }}>{error}</div>}

          <button onClick={upload} disabled={loading || files.length === 0}
            style={{ padding: "13px 0", background: files.length === 0 || loading ? "#E8E4DE" : "#B8922A", color: files.length === 0 || loading ? "#A09890" : "#fff", border: "none", borderRadius: 12, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, fontWeight: 600, cursor: files.length === 0 || loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? <><Loader2 size={14} className="spin" /> Uploading...</> : <><Upload size={14} /> Upload</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── BOOK EDIT MODAL ───────────────────────────────────────────────────────────
const BookEditModal = ({ book, onClose, onUpdate }) => {
  const [title, setTitle] = useState(book.title || "");
  const [tags, setTags] = useState(book.tags?.map(t => t.name).join(", ") || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    setSaving(true); setError("");
    try {
      const formData = new FormData();
      if (title.trim()) formData.append("title", title.trim());
      formData.append("tags", tags.trim());
      const res = await fetch(`${BOOKS_API}/${book.uid}`, { method: "PUT", body: formData });
      if (!res.ok) { const data = await res.json().catch(() => null); throw new Error(data?.detail ?? `HTTP ${res.status}`); }
      const updated = await res.json();
      onUpdate(updated); onClose();
    } catch (e) {
      setError(e.message || "Failed to save.");
    } finally { setSaving(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(28,26,23,0.4)", backdropFilter: "blur(6px)" }}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 420, margin: "0 16px", boxShadow: "0 32px 80px rgba(28,26,23,0.18)", overflow: "hidden" }}>
        <div style={{ padding: "22px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, color: "#1C1A17" }}>Edit Book</span>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid #E8E4DE", background: "#F7F5F2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B6560" }}>
            <X size={15} />
          </button>
        </div>
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: "#6B6560", display: "block", marginBottom: 6 }}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Book title..."
              style={{ width: "100%", padding: "10px 14px", border: "1px solid #E8E4DE", borderRadius: 10, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#1C1A17", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: "#6B6560", display: "block", marginBottom: 6 }}>Tags (comma separated)</label>
            <input value={tags} onChange={e => setTags(e.target.value)} placeholder="history, science, fiction..."
              style={{ width: "100%", padding: "10px 14px", border: "1px solid #E8E4DE", borderRadius: 10, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#1C1A17", outline: "none", boxSizing: "border-box" }} />
          </div>
          {error && <div style={{ padding: "10px 14px", background: "#FEF2F0", border: "1px solid #FADADD", borderRadius: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#D94F3D" }}>{error}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={save} disabled={saving}
              style={{ flex: 1, padding: "12px 0", background: saving ? "#E8E4DE" : "#B8922A", color: saving ? "#A09890" : "#fff", border: "none", borderRadius: 10, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {saving ? <><Loader2 size={13} className="spin" /> Saving...</> : <><Check size={13} /> Save</>}
            </button>
            <button onClick={onClose} style={{ flex: 1, padding: "12px 0", background: "#F7F5F2", color: "#6B6560", border: "1px solid #E8E4DE", borderRadius: 10, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── BOOK CARD ─────────────────────────────────────────────────────────────────
const BookCard = ({ book, onDelete, onEdit, isAdmin }) => {
  const [deleting, setDeleting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
    setDeleting(true);
    try { await fetch(`${BOOKS_API}/${book.uid}`, { method: "DELETE" }); onDelete(book.uid); }
    finally { setDeleting(false); }
  };

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #E8E4DE", boxShadow: hovered ? "0 10px 36px rgba(28,26,23,0.11)" : "0 1px 4px rgba(28,26,23,0.05)", transform: hovered ? "translateY(-3px)" : "translateY(0)", transition: "all 0.2s ease", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", aspectRatio: "2/3", background: "#F7F5F2", overflow: "hidden" }}>
        {book.cover_url
          ? <img src={`${API_BASE}${book.cover_url}`} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 0.3s ease" }} />
          : <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#F5EDD8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BookOpen size={20} color="#B8922A" />
              </div>
              <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, color: "#A09890", textAlign: "center", lineHeight: 1.4 }}>{book.title}</span>
            </div>
        }
        <div style={{ position: "absolute", top: 8, left: 8 }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 500, padding: "3px 8px", borderRadius: 20, background: book.extension === "epub" ? "#F0FAF4" : "#FEF2F0", color: book.extension === "epub" ? "#2D7A4F" : "#D94F3D", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            {book.extension}
          </span>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,26,23,0.65) 0%, transparent 55%)", opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease", display: "flex", alignItems: "flex-end", padding: 10, gap: 6, justifyContent: "flex-end" }}>
          <button onClick={(e) => { e.stopPropagation(); navigate(`/read/${book.uid}`); }}
            style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,0.95)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#B8922A" }}>
            <Eye size={14} />
          </button>
          {isAdmin && (
            <>
              <button onClick={(e) => { e.stopPropagation(); onEdit(book); }}
                style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,0.95)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B6560" }}>
                <Pencil size={14} />
              </button>
              <button onClick={handleDelete} disabled={deleting}
                style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,0.95)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#D94F3D", opacity: deleting ? 0.4 : 1 }}>
                {deleting ? <Loader2 size={13} className="spin" /> : <Trash2 size={13} />}
              </button>
            </>
          )}
        </div>
      </div>
      <div style={{ padding: "12px 13px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#1C1A17", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {book.title}
        </span>
        {book.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {book.tags.slice(0, 3).map(tag => (
              <span key={tag.id || tag.name} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "#F5EDD8", color: "#B8922A", fontWeight: 500 }}>
                {tag.name}
              </span>
            ))}
            {book.tags.length > 3 && <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 10, color: "#A09890" }}>+{book.tags.length - 3}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

// ── VIDEO PLAYER MODAL ────────────────────────────────────────────────────────
const VideoPlayerModal = ({ video, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 960, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15, fontWeight: 500, color: "#F0EAD6", margin: 0 }}>{video.title}</p>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#F0EAD6" }}>
            <X size={15} />
          </button>
        </div>
        <video autoPlay controls style={{ width: "100%", borderRadius: 12, background: "#000", maxHeight: "75vh" }}>
          <source src={`${VIDEOS_API}/stream/${video.id}`}/>
        </video>
        {video.description && <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#A09890", margin: 0 }}>{video.description}</p>}
        {video.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {video.tags.map(tag => (
              <span key={tag.id || tag.name} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.1)", color: "#A09890" }}>
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ── VIDEO CARD ────────────────────────────────────────────────────────────────
const VideoCard = ({ video, onDelete, onUpdate, isAdmin, onPlay }) => {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(video.title);
  const [editDesc, setEditDesc] = useState(video.description || "");
  const [editTags, setEditTags] = useState(video.tags?.map(t => t.name).join(", ") || "");
  const [hovered, setHovered] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setDeleting(true);
    try { await fetch(`${VIDEOS_API}/${video.id}`, { method: "DELETE" }); onDelete(video.id); }
    finally { setDeleting(false); }
  };

  const saveEdit = async () => {
    const params = new URLSearchParams();
    if (editTitle.trim()) params.append("title", editTitle.trim());
    params.append("description", editDesc);
    params.append("tags", editTags);
    const res = await fetch(`${VIDEOS_API}/${video.id}?${params}`, { method: "PATCH" });
    if (res.ok) { const updated = await res.json(); onUpdate(updated); setEditing(false); }
  };

  return (
    <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #E8E4DE", boxShadow: hovered ? "0 8px 28px rgba(28,26,23,0.10)" : "0 1px 4px rgba(28,26,23,0.05)", transition: "all 0.2s ease" }}>
      <div onClick={() => !editing && onPlay(video)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", aspectRatio: "16/9", background: "#111", cursor: "pointer", overflow: "hidden" }}>
        <video preload="metadata" muted style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.03)" : "scale(1)", transition: "transform 0.3s ease" }}>
          <source src={`${VIDEOS_API}/stream/${video.id}#t=1`}/>
        </video>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: hovered ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.15)", transition: "background 0.2s ease" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", transform: hovered ? "scale(1.1)" : "scale(1)" }}>
            <div style={{ width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "15px solid #1C1A17", marginLeft: 3 }} />
          </div>
        </div>
        {isAdmin && (
          <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 6, opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease" }}>
            <button onClick={e => { e.stopPropagation(); setEditing(true); }}
              style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "rgba(255,255,255,0.9)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B6560" }}>
              <Pencil size={12} />
            </button>
            <button onClick={handleDelete} disabled={deleting}
              style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "rgba(255,255,255,0.9)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#D94F3D", opacity: deleting ? 0.4 : 1 }}>
              {deleting ? <Loader2 size={12} className="spin" /> : <Trash2 size={12} />}
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
          <input autoFocus value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Title..."
            style={{ padding: "9px 12px", border: "1.5px solid #B8922A", borderRadius: 9, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#1C1A17", outline: "none" }} />
          <input value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="Description (optional)..."
            style={{ padding: "9px 12px", border: "1px solid #E8E4DE", borderRadius: 9, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: "#6B6560", outline: "none" }} />
          <input value={editTags} onChange={e => setEditTags(e.target.value)} placeholder="Tags (comma separated)..."
            style={{ padding: "9px 12px", border: "1px solid #E8E4DE", borderRadius: 9, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: "#6B6560", outline: "none" }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={saveEdit} style={{ flex: 1, padding: "9px 0", background: "#B8922A", color: "#fff", border: "none", borderRadius: 9, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Check size={12} /> Save
            </button>
            <button onClick={() => setEditing(false)} style={{ flex: 1, padding: "9px 0", background: "#F7F5F2", color: "#6B6560", border: "1px solid #E8E4DE", borderRadius: 9, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <X size={12} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding: "10px 14px 12px" }}>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#1C1A17", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: "0 0 4px" }}>{video.title}</p>
          {video.tags?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {video.tags.slice(0, 3).map(tag => (
                <span key={tag.id || tag.name} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "#F5EDD8", color: "#B8922A", fontWeight: 500 }}>
                  {tag.name}
                </span>
              ))}
              {video.tags.length > 3 && <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 10, color: "#A09890" }}>+{video.tags.length - 3}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── AUDIO CARD ────────────────────────────────────────────────────────────────
const AudioCard = ({ audio, onDelete, onUpdate, isAdmin, onPlay, currentlyPlaying }) => {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(audio.title);
  const [editDesc, setEditDesc] = useState(audio.description || "");
  const [editTags, setEditTags] = useState(audio.tags?.map(t => t.name).join(", ") || "");
  const audioRef = React.useRef(null);

  useEffect(() => {
    if (currentlyPlaying !== audio.id && audioRef.current) audioRef.current.pause();
  }, [currentlyPlaying, audio.id]);

  const handleDelete = async () => {
    setDeleting(true);
    try { await fetch(`${AUDIO_API}/${audio.id}`, { method: "DELETE" }); onDelete(audio.id); }
    finally { setDeleting(false); }
  };

  const saveEdit = async () => {
    const params = new URLSearchParams();
    if (editTitle.trim()) params.append("title", editTitle.trim());
    params.append("description", editDesc);
    params.append("tags", editTags);
    const res = await fetch(`${AUDIO_API}/${audio.id}?${params}`, { method: "PATCH" });
    if (res.ok) { const updated = await res.json(); onUpdate(updated); setEditing(false); }
  };

  return (
    <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #E8E4DE", boxShadow: "0 1px 4px rgba(28,26,23,0.05)" }}>
      <div style={{ background: "linear-gradient(135deg, #F5EDD8 0%, #EDE0C4 100%)", padding: "20px 16px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "#B8922A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(184,146,42,0.3)" }}>
          <Music size={22} color="#fff" />
        </div>
        <audio ref={audioRef} controls onPlay={() => onPlay(audio.id)} style={{ width: "100%", height: 36 }}>
          <source src={`${AUDIO_API}/stream/${audio.id}`} />
        </audio>
      </div>

      {editing ? (
        <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid #E8E4DE" }}>
          <input autoFocus value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Title..."
            style={{ padding: "9px 12px", border: "1.5px solid #B8922A", borderRadius: 9, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#1C1A17", outline: "none" }} />
          <input value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="Description (optional)..."
            style={{ padding: "9px 12px", border: "1px solid #E8E4DE", borderRadius: 9, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: "#6B6560", outline: "none" }} />
          <input value={editTags} onChange={e => setEditTags(e.target.value)} placeholder="Tags (comma separated)..."
            style={{ padding: "9px 12px", border: "1px solid #E8E4DE", borderRadius: 9, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: "#6B6560", outline: "none" }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={saveEdit} style={{ flex: 1, padding: "9px 0", background: "#B8922A", color: "#fff", border: "none", borderRadius: 9, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Check size={12} /> Save
            </button>
            <button onClick={() => setEditing(false)} style={{ flex: 1, padding: "9px 0", background: "#F7F5F2", color: "#6B6560", border: "1px solid #E8E4DE", borderRadius: 9, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <X size={12} /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ padding: "12px 14px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, borderTop: "1px solid #E8E4DE" }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#1C1A17", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", margin: "0 0 4px" }}>{audio.title}</p>
            {audio.tags?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {audio.tags.slice(0, 3).map(tag => (
                  <span key={tag.id || tag.name} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "#F5EDD8", color: "#B8922A", fontWeight: 500 }}>
                    {tag.name}
                  </span>
                ))}
                {audio.tags.length > 3 && <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 10, color: "#A09890" }}>+{audio.tags.length - 3}</span>}
              </div>
            )}
          </div>
          {isAdmin && (
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <button onClick={() => setEditing(true)} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #E8E4DE", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B6560" }}>
                <Pencil size={12} />
              </button>
              <button onClick={handleDelete} disabled={deleting} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #FADADD", background: "#FEF2F0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#D94F3D", opacity: deleting ? 0.4 : 1 }}>
                {deleting ? <Loader2 size={12} className="spin" /> : <Trash2 size={12} />}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── EMPTY STATE ───────────────────────────────────────────────────────────────
const EmptyState = ({ tab, onUpload, isAdmin }) => {
  const Icon = tab === "books" ? BookOpen : tab === "audio" ? Music : Film;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, textAlign: "center" }}>
      <div style={{ width: 68, height: 68, borderRadius: 20, background: "#F5EDD8", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={28} color="#B8922A" />
      </div>
      <div>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: "#1C1A17", margin: "0 0 6px" }}>No {tab} yet</p>
        <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#A09890", margin: 0 }}>
          {isAdmin ? `Upload some ${tab} to get started` : "Nothing here yet — check back later"}
        </p>
      </div>
      {isAdmin && (
        <button onClick={onUpload} style={{ padding: "11px 22px", background: "#B8922A", color: "#fff", border: "none", borderRadius: 10, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <Plus size={14} /> Add {tab}
        </button>
      )}
    </div>
  );
};

// ── MAIN APP ──────────────────────────────────────────────────────────────────
const Library = () => {
  const { isAdmin, logout, auth } = useAuth();
  const navigate = useNavigate();

  const isMobile = window.innerWidth < 640;

  const [activeTab, setActiveTab] = useState("books");
  const [books, setBooks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [bookTagsList, setBookTagsList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBookTags, setSelectedBookTags] = useState([]);
  const [selectedVideoTags, setSelectedVideoTags] = useState([]);
  const [selectedAudioTags, setSelectedAudioTags] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentlyPlayingAudio, setCurrentlyPlayingAudio] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const fetchBooks = async () => {
    try {
      const params = new URLSearchParams();
      if (selectedBookTags.length > 0) params.set("tags", selectedBookTags.join(","));
      if (search.trim()) params.set("title", search.trim());
      const res = await fetch(`${BOOKS_API}/search/?${params}`);
      if (res.ok) setBooks(await res.json());
    } catch {}
  };

  const fetchVideos = async () => {
    try { const res = await fetch(`${VIDEOS_API}/`); if (res.ok) setVideos(await res.json()); } catch {}
  };

  const fetchAudio = async () => {
    try { const res = await fetch(`${AUDIO_API}/`); if (res.ok) setAudioTracks(await res.json()); } catch {}
  };

  const fetchTags = async () => {
    try {
      const res = await fetch(`${BOOKS_API}/search/`);
      if (!res.ok) return;
      const booksData = await res.json();
      const uniqueBookTags = [
        ...new Map(
          booksData.flatMap(book => book.tags || []).map(tag => [tag.name, tag])
        ).values()
      ];
      setBookTagsList(uniqueBookTags);
    } catch {}
  };

  useEffect(() => {
    Promise.all([fetchBooks(), fetchVideos(), fetchAudio(), fetchTags()]).finally(() => setLoading(false));
  }, []);

  useEffect(() => { if (!loading) fetchBooks(); }, [selectedBookTags, search]);

  const filteredVideos = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedVideoTags.length === 0 || v.tags?.some(t => selectedVideoTags.includes(t.name)))
  );

  const filteredAudio = audioTracks.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedAudioTags.length === 0 || a.tags?.some(t => selectedAudioTags.includes(t.name)))
  );

  const videoTags = [...new Map(videos.flatMap(v => v.tags || []).map(t => [t.name, t])).values()];
  const audioTagsList = [...new Map(audioTracks.flatMap(a => a.tags || []).map(t => [t.name, t])).values()];

  const handleLogout = () => { logout(); navigate("/"); };
  const uploadType = activeTab === "books" ? "book" : activeTab === "audio" ? "audio" : "video";

  const tabs = [
    { id: "books", label: "Books", icon: BookOpen, count: books.length },
    { id: "audio", label: "Audio", icon: Music, count: audioTracks.length },
    { id: "videos", label: "Videos", icon: Film, count: videos.length },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#fff", fontFamily: "'IBM Plex Sans', sans-serif", overflow: "hidden" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: isMobile ? 58 : 220, flexShrink: 0, background: "#fff", borderRight: "1px solid #E8E4DE", display: "flex", flexDirection: "column" }}>

        {/* Logo */}
        <div style={{ padding: isMobile ? "14px 0" : "24px 20px 20px", borderBottom: "1px solid #E8E4DE", display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start" }}>
          {isMobile
            ? <BookOpen size={20} color="#B8922A" />
            : <div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 700, color: "#1C1A17", margin: 0, letterSpacing: "-0.01em" }}>Jirani</h1>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#A09890", margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "0.08em" }}>Offline Library</p>
              </div>
          }
        </div>

        {/* Nav */}
        <nav style={{ padding: isMobile ? "10px 6px" : "12px 10px" }}>
          {tabs.map(({ id, label, icon: Icon, count }) => (
            <button key={id}
              onClick={() => { setActiveTab(id); setSelectedBookTags([]); setSelectedVideoTags([]); setSelectedAudioTags([]); setSearch(""); }}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 2 : 10, padding: isMobile ? "8px 0" : "10px 12px", borderRadius: 10, border: "none", background: activeTab === id ? "#F5EDD8" : "transparent", color: activeTab === id ? "#B8922A" : "#6B6560", cursor: "pointer", marginBottom: 2, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: activeTab === id ? 600 : 400, transition: "all 0.15s" }}>
              <Icon size={isMobile ? 20 : 15} />
              {isMobile
                ? <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: activeTab === id ? "#B8922A" : "#A09890" }}>{count}</span>
                : <>
                    <span style={{ flex: 1 }}>{label}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, padding: "1px 8px", borderRadius: 20, background: activeTab === id ? "#B8922A" : "#F0EDE8", color: activeTab === id ? "#fff" : "#A09890" }}>
                      {count}
                    </span>
                  </>
              }
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ marginTop: "auto", padding: isMobile ? "10px 6px" : "12px 10px", borderTop: "1px solid #E8E4DE", display: "flex", flexDirection: "column", gap: 6 }}>
          {isAdmin && (
            <button onClick={() => setShowAddAdmin(true)}
              onMouseEnter={e => { e.currentTarget.style.background = "#F5EDD8"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: 8, padding: isMobile ? "8px 0" : "8px 12px", borderRadius: 10, border: "1px dashed #D4A93A", background: "transparent", color: "#B8922A", cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, fontWeight: 500 }}>
              <UserPlus size={isMobile ? 18 : 13} />
              {!isMobile && "Add Admin"}
            </button>
          )}
          <div style={{ padding: isMobile ? "8px 0" : "8px 12px", borderRadius: 10, background: "#FAFAF9", display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "space-between", gap: 8 }}>
            {!isMobile && (
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, fontWeight: 500, color: "#1C1A17", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {isAdmin ? auth?.username : "Student"}
                </p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#A09890", margin: 0, textTransform: "uppercase" }}>
                  {isAdmin ? "Admin" : "Guest"}
                </p>
              </div>
            )}
            <button onClick={handleLogout} title="Sign out"
              style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #E8E4DE", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#A09890", flexShrink: 0 }}>
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: "#FAFAF9" }}>

        {/* Topbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: isMobile ? "12px 12px" : "16px 28px", background: "#fff", borderBottom: "1px solid #E8E4DE" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 16 : 22, fontWeight: 600, color: "#1C1A17", margin: 0, letterSpacing: "-0.01em", flexShrink: 0 }}>
            {activeTab === "books" ? "Books" : activeTab === "audio" ? "Audio" : "Videos"}
          </h2>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, padding: "2px 9px", borderRadius: 20, background: "#F5EDD8", color: "#B8922A", flexShrink: 0 }}>
            {activeTab === "books" ? books.length : activeTab === "audio" ? filteredAudio.length : filteredVideos.length}
          </span>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            {/* Search */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F7F5F2", border: "1px solid #E8E4DE", borderRadius: 10, padding: "8px 10px", minWidth: 0, flex: 1, maxWidth: isMobile ? 140 : 220 }}>
              <Search size={13} color="#A09890" style={{ flexShrink: 0 }} />
              <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                style={{ background: "transparent", border: "none", outline: "none", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: "#1C1A17", width: "100%", minWidth: 0 }} />
            </div>

            {/* Tag filter */}
            {activeTab === "books" && (
              <TagDropdown allTags={bookTagsList} selectedTags={selectedBookTags}
                onToggle={tag => setSelectedBookTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                onClear={() => setSelectedBookTags([])} />
            )}
            {activeTab === "videos" && (
              <TagDropdown allTags={videoTags} selectedTags={selectedVideoTags}
                onToggle={tag => setSelectedVideoTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                onClear={() => setSelectedVideoTags([])} />
            )}
            {activeTab === "audio" && (
              <TagDropdown allTags={audioTagsList} selectedTags={selectedAudioTags}
                onToggle={tag => setSelectedAudioTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                onClear={() => setSelectedAudioTags([])} />
            )}

            {/* Upload button */}
            {isAdmin && (
              <button onClick={() => setShowUpload(true)}
                onMouseEnter={e => e.currentTarget.style.background = "#F5EDD8"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                style={{ display: "flex", alignItems: "center", gap: isMobile ? 0 : 7, padding: isMobile ? "8px 10px" : "9px 16px", background: "#fff", border: "1.5px solid #B8922A", borderRadius: 10, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#B8922A", cursor: "pointer", transition: "background 0.15s", whiteSpace: "nowrap", flexShrink: 0 }}>
                <Upload size={13} />
                {!isMobile && ` Upload ${activeTab === "books" ? "Book" : activeTab === "audio" ? "Audio" : "Video"}`}
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? 12 : 24 }}>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
              <Loader2 size={26} color="#B8922A" className="spin" />
            </div>
          ) : activeTab === "books" ? (
            books.length === 0
              ? <EmptyState tab="books" onUpload={() => setShowUpload(true)} isAdmin={isAdmin} />
              : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: isMobile ? 10 : 16 }}>
                  {books.map(book => (
                    <BookCard key={book.uid} book={book} isAdmin={isAdmin}
                      onDelete={uid => setBooks(prev => prev.filter(b => b.uid !== uid))}
                      onEdit={setEditingBook} />
                  ))}
                </div>
          ) : activeTab === "audio" ? (
            filteredAudio.length === 0
              ? <EmptyState tab="audio" onUpload={() => setShowUpload(true)} isAdmin={isAdmin} />
              : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: isMobile ? 10 : 16 }}>
                  {filteredAudio.map(audio => (
                    <AudioCard key={audio.id} audio={audio} isAdmin={isAdmin}
                      onPlay={setCurrentlyPlayingAudio}
                      currentlyPlaying={currentlyPlayingAudio}
                      onDelete={id => setAudioTracks(prev => prev.filter(a => a.id !== id))}
                      onUpdate={updated => setAudioTracks(prev => prev.map(a => a.id === updated.id ? updated : a))} />
                  ))}
                </div>
          ) : (
            filteredVideos.length === 0
              ? <EmptyState tab="videos" onUpload={() => setShowUpload(true)} isAdmin={isAdmin} />
              : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: isMobile ? 10 : 16 }}>
                  {filteredVideos.map(video => (
                    <VideoCard key={video.id} video={video} isAdmin={isAdmin}
                      onPlay={setPlayingVideo}
                      onDelete={id => setVideos(prev => prev.filter(v => v.id !== id))}
                      onUpdate={updated => setVideos(prev => prev.map(v => v.id === updated.id ? updated : v))} />
                  ))}
                </div>
          )}
        </div>
      </main>

      {showUpload && isAdmin && (
        <UploadModal onClose={() => setShowUpload(false)}
          onSuccess={() => { fetchBooks(); fetchVideos(); fetchAudio(); fetchTags(); }}
          type={uploadType} />
      )}

      {editingBook && isAdmin && (
        <BookEditModal book={editingBook}
          onClose={() => setEditingBook(null)}
          onUpdate={updated => {
            setBooks(prev => prev.map(b => b.uid === updated.uid ? updated : b));
            setEditingBook(null);
            fetchTags();
          }} />
      )}

      {showAddAdmin && isAdmin && <AddAdminModal onClose={() => setShowAddAdmin(false)} />}

      {playingVideo && <VideoPlayerModal video={playingVideo} onClose={() => setPlayingVideo(null)} />}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        * { box-sizing: border-box; }
        input::placeholder { color: #A09890; }
        button { transition: all 0.15s ease; }
      `}</style>
    </div>
  );
};

export default Library;