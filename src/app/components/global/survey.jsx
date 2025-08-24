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
    question: "How long did it last?",
    type: "single",
    options: ["Few seconds", "1–5 minutes", "5–30 minutes", "Over 30 minutes"]
  },
  {
    question: "Where did it happen?",
    type: "multiple",
    options: ["Home", "Work/School", "Outside", "Public place", "Other"]
  },
  {
    question: "Were you alone or with others?",
    type: "single",
    options: ["Alone", "With friends/family", "With strangers"]
  },
  {
    question: "How intense was it?",
    type: "scale",
    scale: { min: 1, max: 5, labels: ["Very mild", "Very strong"] }
  },
  {
    question: "Did it affect what you were doing?",
    type: "yesno"
  },
  {
    question: "Did you recognize it as unreal?",
    type: "single",
    options: ["Yes, I knew it wasn’t real", "No, it felt real", "Not sure"]
  },
  {
    question: "Were you under stress, tired, or emotional before it happened?",
    type: "multiple",
    options: ["Stressed", "Tired", "Emotional", "Calm", "Other"]
  },
  {
    question: "Have you experienced this before?",
    type: "single",
    options: ["First time", "Sometimes", "Frequently"]
  },
  {
    question: "Did you take any medication, alcohol, or substances before it?",
    type: "multiple",
    options: ["Medication", "Alcohol", "Drugs", "None"]
  },
  {
    question: "Did it cause physical reactions?",
    type: "multiple",
    options: ["Sweating", "Shaking", "Heart racing", "Difficulty breathing", "None"]
  },
  {
    question: "Do you want to talk to someone about this episode?",
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

  const handleNoteChange = (e) => {
    setResponses(prev => ({ ...prev, notes: e.target.value }))
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

      {/* Notes Section */}
      <div className="border p-4 rounded-lg">
        <p className="font-semibold mb-2">Additional Notes</p>
        <textarea
          className="w-full p-2 rounded-lg border border-gray-400 text-black"
          rows={4}
          placeholder="Write anything else you want to share..."
          value={responses.notes || ""}
          onChange={handleNoteChange}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="cursor-pointer mt-4 px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-300 transition"
      >
        Submit
      </button>
    </div>
  )
}
