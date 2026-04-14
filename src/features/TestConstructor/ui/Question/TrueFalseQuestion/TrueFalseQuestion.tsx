import type { FC } from "react"
import type { TTrueFalseQuestion } from "../../../model/types"

type TTrueFalseQuestionProps = {
    question: TTrueFalseQuestion
}

const TrueFalseQuestion: FC<TTrueFalseQuestionProps> = ({ question }) => {
    return <div>{question.questionText}</div>
}

export default TrueFalseQuestion
