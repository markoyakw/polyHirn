import type { FC } from "react"
import type { TShortAnswerQuestion } from "../../../model/types"
import Input from "@/components/ui/Input/Input"
import { Stack } from "@/components/ui/Stack/Stack"
import Button from "@/components/ui/Button/Button"
import Card from "@/components/ui/Card/Card"
import Label from "@/components/ui/Label/Label"
import { useStore } from "@/store"
import {
    MINIMUM_SHORT_ANSWER_COUNT,
    addShortAnswer,
    removeShortAnswer,
    updateShortAnswer,
} from "@/features/TestConstructor/model/utils/update"
import IconButton, { ICON_BUTTON_ICON_MAP } from "@/components/ui/IconButton/IconButton"

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
                {question.correctAnswerArr.map((answer, index) => {
                    const answerInputId = `short-answer-${question.id}-${index}`

                    return (
                        <Card key={answerInputId} tone={2} spacing="s" withBorder>
                            <Stack gap="s">
                                <Label htmlFor={answerInputId}>
                                    Accepted answer {index + 1}
                                </Label>
                                <Stack direction="row" gap="s" secondaryAxisAlignment="center">
                                    <Input
                                        id={answerInputId}
                                        value={answer.answerText}
                                        tone={3}
                                        fullWidth
                                        placeholder="Accepted answer"
                                        onChange={(event) =>
                                            handleAnswerChange(answer.id, event.target.value)
                                        }
                                    />
                                    <IconButton
                                        icon={ICON_BUTTON_ICON_MAP.delete}
                                        aria-label={`Delete accepted answer ${index + 1}`}
                                        onClick={() => handleAnswerRemove(answer.id)}
                                        disabled={question.correctAnswerArr.length <= MINIMUM_SHORT_ANSWER_COUNT}
                                    />
                                </Stack>
                            </Stack>
                        </Card>
                    )
                })}
            </Stack>

            <Button onClick={handleAnswerAdd} fullWidth>
                add accepted answer +
            </Button>
        </Stack>
    )
}

export default ShortAnswerQuestion
