import type { FC } from "react"
import type { TConnectPairsQuestion } from "../../../model/types"

type TConnectPairsQuestionProps = {
    question: TConnectPairsQuestion
}

const ConnectPairsQuestion: FC<TConnectPairsQuestionProps> = ({ question }) => {
    return <div>{question.questionText}</div>
}

export default ConnectPairsQuestion
