import React, { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import API_BASE from '../config'; 

const UploadBook = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState(""); // Comma-separated string
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Use FormData to handle file uploads and form fields
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags); // Backend splits this by comma
    formData.append("file", file);
    if (cover) formData.append("cover", cover);

    try {
      const response = await fetch(`${API_BASE}/books/upload`, {
        method: "POST",
        body: formData,
        // Note: Do NOT set Content-Type header manually when using FormData
        // The browser will automatically set it to multipart/form-data with the correct boundary
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Upload failed");
      }

      const result = await response.json();
      setMessage(`Success! Book uploaded: ${result.title}`);
      
      // Reset form
      setTitle("");
      setTags("");
      setFile(null);
      setCover(null);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Upload New Book</h2>
      
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Book Title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <input
          type="text"
          placeholder="Tags (comma separated: Science, Fiction)"
          className="border p-2 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium">Book File (PDF/EPUB)</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Cover Image (Optional)</label>
          <input
            type="file"
            onChange={(e) => setCover(e.target.files[0])}
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !file}
          className="bg-blue-600 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Upload size={20} />}
          {loading ? "Uploading..." : "Upload Book"}
        </button>
      </form>

      {message && (
        <p className={`text-sm ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadBook;