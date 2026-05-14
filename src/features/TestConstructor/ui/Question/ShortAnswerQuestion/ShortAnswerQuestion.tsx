import type { FC } from "react"
import type { TShortAnswerQuestion } from "@/types/test"
import Input from "@/components/ui/Input/Input"
import { Stack } from "@/components/ui/Stack/Stack"
import Button from "@/components/ui/Button/Button"
import { useStore } from "@/store"
import {
    MINIMUM_SHORT_ANSWER_COUNT,
    addShortAnswer,
    removeShortAnswer,
    updateShortAnswer,
} from "@/features/TestConstructor/model/utils/update"
import { AnimatePresence } from "motion/react"
import ShortAnswer from "./ShortAnswer"

type TShortAnswerQuestionProps = {
    question: TShortAnswerQuestion
}

const ShortAnswerQuestion: FC<TShortAnswerQuestionProps> = ({ question }) => {
    const updateQuestion = useStore((state) => state.updateQuestion)
    const updateQuestionFn = useStore((state) => state.updateQuestionFn)

    const handleAnswerAdd = () => {
        updateQuestionFn(question.id, addShortAnswer())
    }

    const handleAnswerRemove = (answerId: string) => {
        updateQuestionFn(question.id, removeShortAnswer(answerId))
    }

    const handleAnswerChange = (answerId: string, newValue: string) => {
        updateQuestionFn(question.id, updateShortAnswer(answerId, newValue))
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

            <Stack gap="s">
                <AnimatePresence>
                    {question.correctAnswerArr.map((answer, index) => {
                        const answerInputId = `short-answer-${question.id}-${index}`

                        return (
                            <ShortAnswer
                                key={answerInputId}
                                answer={answer}
                                inputId={answerInputId}
                                index={index}
                                isDeleteDisabled={
                                    question.correctAnswerArr.length <= MINIMUM_SHORT_ANSWER_COUNT
                                }
                                onAnswerChange={handleAnswerChange}
                                onAnswerRemove={handleAnswerRemove}
                            />
                        )
                    })}
                </AnimatePresence>
            </Stack>

            <Button onClick={handleAnswerAdd} fullWidth>
                add accepted answer +
            </Button>
        </Stack>
    )
}

export default ShortAnswerQuestion
