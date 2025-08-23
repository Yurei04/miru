"use client"
import { useState } from "react"

export default function ImgDetect () {

    const [selectedFile , setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null);
    const backendUrl = "http://localhost:5000";

     const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch(`${backendUrl}/detect-image`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const blob = await res.blob();
      setPreview(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to fetch. Is backend running?");
    }
  };

    return (
        <div className="">
            <h2></h2>
            <div>
                <img src={preview} alt="Detection Result" className="" />
            </div>
            <div className="">
                <input type="file" accept="image/*" 
                onChange={(e) => setSelectedFile(e.target.files[0])}/>
            </div>

            <div>
                <button 
                    className=""
                    onClick={handleUpload}
                >
                        Start
                </button>
            </div>
        </div>
    )
}