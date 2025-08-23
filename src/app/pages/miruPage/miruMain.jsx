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

import ImgDetect from "@/app/components/imgDetect"
import LiveDetection from "@/app/components/liveDetect"
import SurveyQuestions from "@/app/components/global/survey"


export default function MiruMain() {
    const [showSurvey, setShowSurvey] = useState(false)
    const [detectionType, setDetectionType] = useState("")

    const handleDialogChange = (open, type) => {
        if (!open) {
            setDetectionType(type)
            setShowSurvey(true)
        }
    }

  return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-6">
            <div className="flex lg:flex-row sm:flex-col gap-6">
                <Dialog onOpenChange={(open) => handleDialogChange(open, "Live Detection")}>
                    <DialogTrigger className="px-4 py-2 bg-green-500 text-white rounded-lg shadow cursor-pointer">
                        Live Detection
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Live Detection</DialogTitle>
                        <DialogDescription>Performing live detection...</DialogDescription>
                        </DialogHeader>
                        <LiveDetection />
                    </DialogContent>
                    </Dialog>

                    <Dialog onOpenChange={(open) => handleDialogChange(open, "Image Detection")}>
                    <DialogTrigger className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow cursor-pointer">
                        Image Detection
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Image Detection</DialogTitle>
                        <DialogDescription>Upload an image for detection...</DialogDescription>
                        </DialogHeader>
                        <ImgDetect />
                    </DialogContent>
                </Dialog>
            </div>

            {showSurvey && (
                <div className="mt-8 w-full max-w-2xl">
                <SurveyQuestions detectionType={detectionType} />
                </div>
            )}
        </div>
  )
}
