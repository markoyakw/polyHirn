import type { FC } from "react"
import type { TStudentAnswer, TStudentShortAnswer } from "../../../model/studentAnswer"
import Input from "@/components/ui/Input/Input"

type TShortAnswerQuestionProps = {
    answer: TStudentShortAnswer
    onAnswerChange: (answer: TStudentAnswer) => void
}

const ShortAnswerQuestion: FC<TShortAnswerQuestionProps> = ({ answer, onAnswerChange }) => {
    return (
        <Input
            tone={2}
            fullWidth
            value={answer.answerText}
            onChange={(e) => onAnswerChange({ ...answer, answerText: e.target.value })}
            placeholder="Type your answer..."
        />
    )
}

export default ShortAnswerQuestion
