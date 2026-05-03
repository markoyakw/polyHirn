import type { FC } from "react"
import type { TTrueFalseQuestion } from "../../../model/types"
import Input from "@/components/ui/Input/Input"
import { Stack } from "@/components/ui/Stack/Stack"
import Button from "@/components/ui/Button/Button"
import { useStore } from "@/store"
import { updateTrueFalseAnswer } from "@/features/TestConstructor/model/utils/update"

type TTrueFalseQuestionProps = {
    question: TTrueFalseQuestion
}

const TrueFalseQuestion: FC<TTrueFalseQuestionProps> = ({ question }) => {
    const updateQuestion = useStore((state) => state.updateQuestion)
    const updateQuestionFn = useStore((state) => state.updateQuestionFn)

    const handleCorrectAnswerChange = (newValue: TTrueFalseQuestion["correctAnswer"]) => {
        updateQuestionFn(question.id, updateTrueFalseAnswer(newValue))
    }

    return (
        <Stack gap="m">
            <Input
                value={question.questionText}
                tone={2}
                placeholder="Question text"
                onChange={(event) =>
                    updateQuestion(question.id, { questionText: event.target.value })
                }
            />

            <Stack direction="row" gap="s">
                <Button
                    tone={question.correctAnswer === true ? "primary" : 2}
                    onClick={() => handleCorrectAnswerChange(true)}
                    fullWidth
                >
                    true
                </Button>
                <Button
                    tone={question.correctAnswer === false ? "primary" : 2}
                    onClick={() => handleCorrectAnswerChange(false)}
                    fullWidth
                >
                    false
                </Button>
            </Stack>
        </Stack>
    )
}

export default TrueFalseQuestion
