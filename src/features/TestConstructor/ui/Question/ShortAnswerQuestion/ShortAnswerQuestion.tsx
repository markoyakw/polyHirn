import type { FC } from "react"
import type { TShortAnswerQuestion } from "../../../model/types"

type TShortAnswerQuestionProps = {
    question: TShortAnswerQuestion
}

const ShortAnswerQuestion: FC<TShortAnswerQuestionProps> = ({ question }) => {
    return <div>{question.questionText}</div>
}

export default ShortAnswerQuestion
