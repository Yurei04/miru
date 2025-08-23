"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const questions = [
  {
    question: "What did you see?",
    type: "multiple",
    options: ["Animal", "Human", "Object", "Shadow", "Light", "Other"]
  },
  {
    question: "What did you hear?",
    type: "multiple",
    options: ["Voices", "Music", "Noise", "Whispers", "Other"]
  },
  {
    question: "Did it scare you?",
    type: "yesno"
  },
  {
    question: "Do you want to report this episode?",
    type: "yesno"
  }
]

export default function SurveyQuestions({ detectionType }) {
  const [responses, setResponses] = useState({})
  const router = useRouter()

  const handleMultiChange = (qIndex, option, isChecked) => {
    setResponses(prev => {
      const prevArr = Array.isArray(prev[qIndex]) ? prev[qIndex] : []
      const nextArr = isChecked
        ? Array.from(new Set([...prevArr, option]))
        : prevArr.filter(o => o !== option)
      return { ...prev, [qIndex]: nextArr }
    })
  }

  const handleYesNoChange = (qIndex, value, isChecked) => {
    setResponses(prev => {
      if (isChecked) {
        return { ...prev, [qIndex]: value }
      } else {
        const copy = { ...prev }
        if (copy[qIndex] === value) delete copy[qIndex]
        return copy
      }
    })
  }

  const handleSubmit = () => {
    const now = new Date()
    const submission = {
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      detectionType,
      responses
    }

    console.log("Survey submitted:", submission)
    router.push("/")
  }

  return (
    <div className="p-4 space-y-6">
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="border p-4 rounded-lg">
          <p className="font-semibold mb-2">{q.question}</p>

          {q.type === "multiple" && (
            <div className="space-y-2">
              {q.options.map((opt, aIndex) => {
                const id = `q${qIndex}-opt${aIndex}`
                const checked = (responses[qIndex] || []).includes(opt)
                return (
                  <label key={id} htmlFor={id} className="flex items-center gap-2">
                    <input
                      id={id}
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => handleMultiChange(qIndex, opt, e.target.checked)}
                    />
                    <span>{opt}</span>
                  </label>
                )
              })}
            </div>
          )}

          {q.type === "yesno" && (
            <div className="space-y-2">
              {["Yes", "No"].map((val, aIndex) => {
                const id = `q${qIndex}-yn${aIndex}`
                const checked = responses[qIndex] === val
                return (
                  <label key={id} htmlFor={id} className="flex items-center gap-2">
                    <input
                      id={id}
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => handleYesNoChange(qIndex, val, e.target.checked)}
                    />
                    <span>{val}</span>
                  </label>
                )
              })}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-300 transition"
      >
        Submit
      </button>
    </div>
  )
}
