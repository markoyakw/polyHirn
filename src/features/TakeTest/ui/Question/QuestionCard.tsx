import type { FC } from "react"
import type { TQuestion } from "@/types/test"
import Card from "@/components/ui/Card/Card"
import { Stack } from "@/components/ui/Stack/Stack"
import Text from "@/components/ui/Text/Text"
import Heading from "@/components/ui/Heading/Heading"
import { QUESTION_TYPE_LABELS } from "@/features/TestConstructor/model/constants"
import type { TStudentAnswer } from "../../model/studentAnswer"
import QuestionAnswerRenderer from "./QuestionAnswerRenderer"
import classes from "./QuestionCard.module.css"

type TQuestionCardProps = {
    question: TQuestion
    index: number
    studentAnswer: TStudentAnswer | undefined
    onAnswerChange: (answer: TStudentAnswer) => void
}

const QuestionCard: FC<TQuestionCardProps> = ({ question, index, studentAnswer, onAnswerChange }) => {
    return (
        <Card withBorder spacing="m" className={classes["card"]}>
            <Stack gap="m">
                <Stack gap="xs">
                    <Text as="span" size="xs" color="secondary">
                        QUESTION {index + 1} — {QUESTION_TYPE_LABELS[question.type].toUpperCase()}
                    </Text>
                    <Heading as="h3">{question.questionText}</Heading>
                </Stack>
                {studentAnswer != null && (
                    <QuestionAnswerRenderer
                        question={question}
                        studentAnswer={studentAnswer}
                        onAnswerChange={onAnswerChange}
                    />
                )}
            </Stack>
        </Card>
    )
}

export default QuestionCard
