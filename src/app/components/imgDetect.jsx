"use client"
import { useState } from "react"

export default function ImgDetect() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const backendUrl = "http://localhost:5000"

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)

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
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 bg-gray-900 text-yellow-400 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold">🖼 Image Detection</h2>

      {preview && (
        <div className="w-full max-w-md">
          <img
            src={preview}
            alt="Detection Result"
            className="rounded-xl border-2 border-yellow-400 shadow-md"
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-300 cursor-pointer"
      />

      <button
        onClick={handleUpload}
        className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-300 transition"
      >
        Start Detection
      </button>
    </div>
  )
}
