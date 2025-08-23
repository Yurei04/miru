

const Questions = [
    {
        "question": "",
        "answers": ["", "", ""],
    }
]

export default function SuveryQuestions () {
    return (
        <div>
            {Questions.map((quest, idx) => {
                <div key={idx} className="">
                    {quest.answers.map((ans, num) => {
                        ans
                    })}
                </div>
            })}
        </div>
    )
}