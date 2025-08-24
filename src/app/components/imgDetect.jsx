"use client"
import { useState } from "react"
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ImgDetect() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const backendUrl = "http://localhost:5000"

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)

    setLoading(true)
    try {
      const res = await fetch(`${backendUrl}/detect-image`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      const blob = await res.blob()
      setPreview(URL.createObjectURL(blob))
    } catch (err) {
      console.error("Upload failed:", err)
      alert("Failed to fetch. Is backend running?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 bg-gray-950 text-yellow-400 rounded-2xl shadow-lg border border-yellow-500">
      <h2 className="text-2xl font-bold">🖼 Image Detection</h2>

      {preview && (
        <div className="w-full max-w-md flex items-center justify-center">
          <Zoom>
            <img
              src={preview}
              alt="Detection Result"
              className="rounded-xl border-2 border-yellow-500 shadow-lg max-w-full max-h-full object-contain"
            />
          </Zoom>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setSelectedFile(e.target.files[0])
          setPreview(null)
        }}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                   file:text-sm file:font-semibold file:bg-yellow-400 
                   file:text-gray-900 hover:file:bg-yellow-300 cursor-pointer 
                   text-yellow-300"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-6 py-2 font-semibold rounded-lg shadow-md transition
          ${loading 
            ? "bg-yellow-700 text-gray-300 cursor-not-allowed" 
            : "bg-yellow-400 text-gray-900 hover:bg-yellow-300"}`}
      >
        {loading ? "Detecting..." : "Start Detection"}
      </button>
    </div>
  )
}
