import type { FC } from "react"
import type { TQuestion } from "@/types/test"
import type { TStudentAnswer } from "../../model/studentAnswer"
import MultipleChoiceQuestion from "./MultipleChoiceQuestion/MultipleChoiceQuestion"
import TrueFalseQuestion from "./TrueFalseQuestion/TrueFalseQuestion"
import MatchPairsQuestion from "./MatchPairsQuestion/Question"
import ShortAnswerQuestion from "./ShortAnswerQuestion/ShortAnswerQuestion"

type TQuestionAnswerRendererProps = {
    question: TQuestion
    studentAnswer: TStudentAnswer
    onAnswerChange: (answer: TStudentAnswer) => void
}

const QuestionAnswerRenderer: FC<TQuestionAnswerRendererProps> = ({
    question,
    studentAnswer,
    onAnswerChange,
}) => {
    switch (question.type) {
        case "multipleChoice":
            if (studentAnswer.type !== "multipleChoice") return null
            return (
                <MultipleChoiceQuestion
                    question={question}
                    answer={studentAnswer}
                    onAnswerChange={onAnswerChange}
                />
            )
        case "trueFalse":
            if (studentAnswer.type !== "trueFalse") return null
            return (
                <TrueFalseQuestion
                    answer={studentAnswer}
                    onAnswerChange={onAnswerChange}
                />
            )
        case "matchPairs":
            if (studentAnswer.type !== "matchPairs") return null
            return (
                <MatchPairsQuestion
                    question={question}
                    answer={studentAnswer}
                    onAnswerChange={onAnswerChange}
                />
            )
        case "shortAnswer":
            if (studentAnswer.type !== "shortAnswer") return null
            return (
                <ShortAnswerQuestion
                    answer={studentAnswer}
                    onAnswerChange={onAnswerChange}
                />
            )
        case "fillGaps":
            return null
    }
}

export default QuestionAnswerRenderer
