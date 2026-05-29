import type { FC } from "react"
import type { TMultipleChoiceQuestion } from "@/types/test"
import type { TStudentAnswer, TStudentMultipleChoiceAnswer } from "../../../model/studentAnswer"
import { Stack } from "@/components/ui/Stack/Stack"
import Card from "@/components/ui/Card/Card"
import Checkbox from "@/components/ui/Checkbox/Checkbox"
import Label from "@/components/ui/Label/Label"
import getLetterByIndex from "@/utils/getLetterByIndex"
import classes from "./MultipleChoiceQuestion.module.css"

type TMultipleChoiceQuestionProps = {
    question: TMultipleChoiceQuestion
    answer: TStudentMultipleChoiceAnswer
    onAnswerChange: (answer: TStudentAnswer) => void
}

const MultipleChoiceQuestion: FC<TMultipleChoiceQuestionProps> = ({ question, answer, onAnswerChange }) => {
    const handleToggle = (answerId: string) => {
        const isSelected = answer.selectedAnswerIds.includes(answerId)
        const newSelected = isSelected
            ? answer.selectedAnswerIds.filter((id) => id !== answerId)
            : [...answer.selectedAnswerIds, answerId]
        onAnswerChange({ ...answer, selectedAnswerIds: newSelected })
    }

    return (
        <Stack gap="s">
            {question.answerArr.map((option, index) => {
                const checkboxId = `take-mc-${question.id}-${option.id}`
                const isSelected = answer.selectedAnswerIds.includes(option.id)

                return (
                    <Card key={option.id} tone={2} spacing="s" withBorder className={classes["option"]}>
                        <Stack direction="row" gap="s" secondaryAxisAlignment="center">
                            <Checkbox
                                id={checkboxId}
                                checked={isSelected}
                                onChange={() => handleToggle(option.id)}
                            />
                            <Label htmlFor={checkboxId} className={classes["option__label"]}>
                                {getLetterByIndex(index, true)}) {option.answerText}
                            </Label>
                        </Stack>
                    </Card>
                )
            })}
        </Stack>
    )
}

export default MultipleChoiceQuestion
