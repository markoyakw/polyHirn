import type { FC } from "react"
import type { TStudentAnswer, TStudentTrueFalseAnswer } from "../../../model/studentAnswer"
import { Stack } from "@/components/ui/Stack/Stack"
import Button from "@/components/ui/Button/Button"

type TTrueFalseQuestionProps = {
    answer: TStudentTrueFalseAnswer
    onAnswerChange: (answer: TStudentAnswer) => void
}

const TrueFalseQuestion: FC<TTrueFalseQuestionProps> = ({ answer, onAnswerChange }) => {
    return (
        <Stack direction="row" gap="s">
            <Button
                fullWidth
                tone={answer.answer === true ? "primary" : 2}
                onClick={() => onAnswerChange({ ...answer, answer: true })}
            >
                True
            </Button>
            <Button
                fullWidth
                tone={answer.answer === false ? "primary" : 2}
                onClick={() => onAnswerChange({ ...answer, answer: false })}
            >
                False
            </Button>
        </Stack>
    )
}

export default TrueFalseQuestion
