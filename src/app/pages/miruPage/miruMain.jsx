"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

import ImgDetect from "@/app/components/imgDetect"
import LiveDetection from "@/app/components/liveDetect"
import SurveyQuestions from "@/app/components/global/survey"
import HistoryPage from "../historyPage/historyMain"
import { Button } from "@/components/ui/button"

export default function MiruMain() {
    const [showSurvey, setShowSurvey] = useState(false)
    const [detectionType, setDetectionType] = useState("")
    const router = useRouter();
    const handleDialogChange = (open, type) => {
        if (!open) {
            setDetectionType(type)
            setShowSurvey(true)
        }
    }
    const handlePress = () => {
        router.push("/history")
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-black text-yellow-200">
            <div className="flex lg:flex-row sm:flex-col gap-6">
                <Dialog onOpenChange={(open) => handleDialogChange(open, "Live Detection")}>
                    <DialogTrigger className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition cursor-pointer">
                        Live Detection
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 text-yellow-200 border border-yellow-400">
                        <DialogHeader>
                            <DialogTitle className="text-yellow-400">Live Detection</DialogTitle>
                            <DialogDescription>Performing live detection...</DialogDescription>
                        </DialogHeader>
                        <LiveDetection />
                    </DialogContent>
                </Dialog>

                <Dialog onOpenChange={(open) => handleDialogChange(open, "Image Detection")}>
                    <DialogTrigger className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition cursor-pointer">
                        Image Detection
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 text-yellow-200 border border-yellow-400">
                        <DialogHeader>
                            <DialogTitle className="text-yellow-400">Image Detection</DialogTitle>
                            <DialogDescription>Upload an image for detection...</DialogDescription>
                        </DialogHeader>
                        <ImgDetect />
                    </DialogContent>
                </Dialog>

                <Dialog onOpenChange={(open) => handleDialogChange(open, "History")}>
                    <DialogTrigger className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition cursor-pointer">
                        History Records
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 text-yellow-200 border border-yellow-400">
                        <DialogHeader>
                            <DialogTitle className="text-yellow-400">History Recordings</DialogTitle>
                            <DialogDescription>See previous Usage</DialogDescription>
                        </DialogHeader>
                              <button
                                onClick={handlePress}
                                className="mt-4 px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-300 transition"
                            >
                                Open History Records
                            </button>
                    </DialogContent>
                </Dialog>
            </div>

            {showSurvey && (
                <div className="mt-8 w-full max-w-2xl bg-gray-900 p-6 rounded-lg border border-yellow-400 shadow-lg">
                    <SurveyQuestions detectionType={detectionType} />
                </div>
            )}
        </div>
    )
}
