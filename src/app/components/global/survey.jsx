"use client"
import { useState, useEffect } from "react"

const Questions = [
  {
    question: "What did you see?",
    answers: ["Animal", "Human", "Object", "Shadow", "Light", "Other"]
  },
  {
    question: "What did you hear?",
    answers: ["Voices", "Music", "Noise", "Whispers", "Other"]
  },
  {
    question: "How real did it feel?",
    answers: ["Not real", "Somewhat real", "Very real"]
  },
  {
    question: "Did it scare you?",
    answers: ["Yes", "No", "A little"]
  }
]

export default function SurveyQuestions({ detectionType }) {
  const [responses, setResponses] = useState({})
  const [sessionInfo, setSessionInfo] = useState({
    startTime: "",
    endTime: "",
    duration: "",
    detection: detectionType || "Unknown"
  })

  // record session start when component loads
  useEffect(() => {
    const start = new Date()
    setSessionInfo((prev) => ({
      ...prev,
      startTime: start.toLocaleString()
    }))
  }, [detectionType])

  const handleCheckboxChange = (qIndex, answer) => {
    setResponses((prev) => {
      const prevAnswers = prev[qIndex] || []
      if (prevAnswers.includes(answer)) {
        return {
          ...prev,
          [qIndex]: prevAnswers.filter((a) => a !== answer),
        }
      } else {
        return {
          ...prev,
          [qIndex]: [...prevAnswers, answer],
        }
      }
    })
  }

  const finishSurvey = () => {
    const end = new Date()
    const start = new Date(sessionInfo.startTime)
    const durationMs = end - start
    const durationMin = Math.floor(durationMs / 60000)
    const durationSec = Math.floor((durationMs % 60000) / 1000)

    setSessionInfo((prev) => ({
      ...prev,
      endTime: end.toLocaleString(),
      duration: `${durationMin}m ${durationSec}s`
    }))
  }

  return (
    <div className="p-4 space-y-6">
      {/* Survey Questions */}
      {Questions.map((quest, qIndex) => (
        <div key={qIndex} className="border p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">{quest.question}</h3>
          <div className="space-y-2">
            {quest.answers.map((answer, aIndex) => (
              <label key={aIndex} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={answer}
                  checked={responses[qIndex]?.includes(answer) || false}
                  onChange={() => handleCheckboxChange(qIndex, answer)}
                />
                <span>{answer}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Finish Button */}
      <button
        onClick={finishSurvey}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        Finish Survey
      </button>

      {/* Session Data */}
      <div className="mt-6 bg-gray-100 p-4 rounded">
        <h4 className="font-bold">📊 Session Data</h4>
        <p><strong>Start Time:</strong> {sessionInfo.startTime}</p>
        <p><strong>End Time:</strong> {sessionInfo.endTime}</p>
        <p><strong>Duration:</strong> {sessionInfo.duration}</p>
        <p><strong>Detection Type:</strong> {sessionInfo.detection}</p>
      </div>

      {/* Debug: Raw Responses */}
      <pre className="mt-4 bg-gray-100 p-2 rounded">
        {JSON.stringify(responses, null, 2)}
      </pre>
    </div>
  )
}
