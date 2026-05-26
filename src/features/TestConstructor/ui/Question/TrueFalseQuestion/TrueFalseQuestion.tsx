import type { FC } from "react"
import type { TTrueFalseQuestion } from "@/types/test"
import Input from "@/components/ui/Input/Input"
import { Stack } from "@/components/ui/Stack/Stack"
import Button from "@/components/ui/Button/Button"
import { useStore } from "@/store"
import {
    selectTrueFalseQuestionById,
    selectUpdateQuestion,
    selectUpdateQuestionFn,
} from "@/store/slices/testConstructor.selectors"
import { updateTrueFalseAnswer } from "@/features/TestConstructor/model/utils/update"

type TTrueFalseQuestionProps = {
    questionId: TTrueFalseQuestion["id"]
}

const TrueFalseQuestion: FC<TTrueFalseQuestionProps> = ({ questionId }) => {
    const question = useStore(selectTrueFalseQuestionById(questionId))
    const updateQuestion = useStore(selectUpdateQuestion)
    const updateQuestionFn = useStore(selectUpdateQuestionFn)

    const handleCorrectAnswerChange = (newValue: TTrueFalseQuestion["answer"]) => {
        updateQuestionFn(questionId, updateTrueFalseAnswer(newValue))
    }

    return (
        <Stack gap="m">
            <Input
                value={question.questionText}
                tone={2}
                placeholder="Question text"
                onChange={(event) =>
                    updateQuestion(questionId, { questionText: event.target.value })
                }
            />

            <Stack direction="row" gap="s">
                <Button
                    tone={question.answer === true ? "primary" : 2}
                    onClick={() => handleCorrectAnswerChange(true)}
                    fullWidth
                >
                    true
                </Button>
                <Button
                    tone={question.answer === false ? "primary" : 2}
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
