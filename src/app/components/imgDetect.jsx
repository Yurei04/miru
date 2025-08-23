import { useState } from "react"

export default function ImgDetect () {

    const [selectedFile , setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null);
    const backendUrl = "http://localhost:5000";

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch(`${backendUrl}/detect-image`, {
        method: "POST",
        body: formData,
        });

        const blob = await res.blob();
        setPreview(URL.createObjectURL(blob));
        }

    return (
        <div className="">
            <div>
                <img src={preview} alt="Detection Result" className="" />
            </div>
            <div className="">
                <input type="file" accept="image/*" />
                onChange={(e) => setSelectedFile(e.target.file[0])}
            </div>

            <div>
                <button 
                    className=""
                    onClick={handleUpload}
                >

                </button>
            </div>
        </div>
    )
}