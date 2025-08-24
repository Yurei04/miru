"use client"

import { useState } from "react";

export default function LiveDetection() {
    const backendUrl = "https://api-miru.onrender.com";
    const [streaming, setStreaming] = useState(false);

    return (
        <div className="w-full flex flex-col items-center justify-center text-yellow-200">
            <h2 className="text-xl font-bold mb-4 text-yellow-400">Live Detection</h2>
            <div className="flex flex-col items-center">
                {!streaming ? (
                    <button
                        onClick={() => setStreaming(true)}
                        className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition"
                    >
                        Start Detection
                    </button>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={() => setStreaming(false)}
                            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-500 transition"
                        >
                            Stop Detection
                        </button>
                        <img
                            src={`${backendUrl}/detect-live`}
                            alt="Live Stream"
                            className="rounded-lg shadow-lg border border-yellow-400"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
