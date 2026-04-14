import type { FC } from "react"
import type { TQuestion } from "../../model/types"
import MultipleChoiceQuestion from "./MultipleChoiceQuestion/MultipleChoiceQuestion"
import TrueFalseQuestion from "./TrueFalseQuestion/TrueFalseQuestion"
import ConnectPairsQuestion from "./ConnectPairsQuestion/ConnectPairsQuestion"
import ShortAnswerQuestion from "./ShortAnswerQuestion/ShortAnswerQuestion"
import Card from "@/components/ui/Card/Card"

type TQuestionProps = {
    question: TQuestion
}

const TypeQuestion: FC<TQuestionProps> = ({ question }) => {
    switch (question.type) {
        case "multipleChoice":
            return <MultipleChoiceQuestion question={question} />;
        case "trueFalse":
            return <TrueFalseQuestion question={question} />;
        case "connectPairs":
            return <ConnectPairsQuestion question={question} />;
        case "shortAnswer":
            return <ShortAnswerQuestion question={question} />;
        default:
            throw new Error("Unknown question type");
    }
};

const Question: FC<TQuestionProps> = ({ question }) => {
    return (
        <Card withBorder spacing="m">
            <TypeQuestion question={question} />
        </Card>
    )
}

export default Question
