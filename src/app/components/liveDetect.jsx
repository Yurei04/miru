"use client"

import { useState } from "react";

export default function LiveDetection () {
    const backendUrl = "http://localhost:5000";
    const [streaming, setStreaming] = useState(false)

    return (
        <div className="">
            <h2></h2>
            <div className="">
                <div className="">
                    {!streaming ? (
                        <button
                            onClick={() => setStreaming(true)}
                            className=""
                        >
                            Stop Detection
                        </button>
                        ) : (
                        <div className="">
                            <button
                                onClick={() => setStreaming(false)}
                                className=""
                            >
                                Stop Detection
                            </button>
                            <img
                                src={`${backendUrl}/detect-live`}
                                alt="Live Stream"
                                className="rounded-lg shadow-lg"
                            />

                        </div>   
                        )
                    }
                </div>
            </div>
        </div>
    )
}