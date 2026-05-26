import type { FC } from "react"
import type { TShortAnswerQuestion } from "@/types/test"
import Input from "@/components/ui/Input/Input"
import { Stack } from "@/components/ui/Stack/Stack"
import Button from "@/components/ui/Button/Button"
import { useStore } from "@/store"
import {
    selectShortAnswerQuestionById,
    selectShortAnswerCount,
    selectShortAnswerIds,
    selectUpdateQuestion,
    selectUpdateQuestionFn,
} from "@/store/slices/testConstructor.selectors"
import {
    MINIMUM_SHORT_ANSWER_COUNT,
    addShortAnswer,
    removeShortAnswer,
    updateShortAnswer,
} from "@/features/TestConstructor/model/utils/update"
import { AnimatePresence } from "motion/react"
import ShortAnswerQuestionAnswer from "./ShortAnswerQuestionAnswer"
import { useShallow } from "zustand/react/shallow"

type TShortAnswerQuestionProps = {
    questionId: TShortAnswerQuestion["id"]
}

const ShortAnswerQuestion: FC<TShortAnswerQuestionProps> = ({ questionId }) => {
    const question = useStore(selectShortAnswerQuestionById(questionId))
    const answerIds = useStore(useShallow(selectShortAnswerIds(questionId)))
    const answerCount = useStore(selectShortAnswerCount(questionId))
    const updateQuestion = useStore(selectUpdateQuestion)
    const updateQuestionFn = useStore(selectUpdateQuestionFn)

    const handleAnswerAdd = () => {
        updateQuestionFn(questionId, addShortAnswer())
    }

    const handleAnswerRemove = (answerId: string) => {
        updateQuestionFn(questionId, removeShortAnswer(answerId))
    }

    const handleAnswerChange = (answerId: string, newValue: string) => {
        updateQuestionFn(questionId, updateShortAnswer(answerId, newValue))
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

            <Stack gap="s">
                <AnimatePresence>
                    {answerIds.map((answerId, index) => {
                        const answerInputId = `short-answer-${question.id}-${index}`

                        return (
                            <ShortAnswerQuestionAnswer
                                key={answerInputId}
                                questionId={questionId}
                                answerId={answerId}
                                inputId={answerInputId}
                                index={index}
                                isDeleteDisabled={
                                    answerCount <= MINIMUM_SHORT_ANSWER_COUNT
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
