import Card from "@/components/ui/Card/Card";
import Input from "@/components/ui/Input/Input";
import { Stack } from "@/components/ui/Stack/Stack";
import type { TMultipleChoiceAnswer, TMultipleChoiceQuestion } from "@/types/test";
import { FC } from "react"
import getLetterByIndex from "@/utils/getLetterByIndex";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Label from "@/components/ui/Label/Label";
import DragableIcon from "@/components/ui/DragableIcon/DragableIcon";
import IconButton, { ICON_BUTTON_ICON_MAP } from "@/components/ui/IconButton/IconButton";
import { useSortable } from "@dnd-kit/react/sortable";
import clsx from "clsx";
import dragClasses from "@/globalStyles/drag.module.css"
import AnimatedStackItem from "@/components/ui/Stack/AnimatedStackItem"
import { useStore } from "@/store";
import { selectMultipleChoiceAnswerById } from "@/store/slices/testConstructor.selectors";
import usePreservedValue from "@/hooks/usePreservedValue";

type TMultipleChoiceAnswerProps = {
    questionId: TMultipleChoiceQuestion["id"],
    answerId: TMultipleChoiceAnswer["id"],
    updateAnswer: (answerId: TMultipleChoiceAnswer['id'], newAnswer: TMultipleChoiceAnswer) => void,
    index: number
    onDelete: (answerId: TMultipleChoiceAnswer["id"]) => void
    isDeleteDisabled: boolean
    isDragOverlay?: boolean
}

const MultipleChoiceAnswer: FC<TMultipleChoiceAnswerProps> = ({
    questionId,
    answerId,
    updateAnswer,
    index,
    onDelete,
    isDeleteDisabled,
    isDragOverlay
}) => {
    const answer = usePreservedValue(useStore(selectMultipleChoiceAnswerById(questionId, answerId)))
    const { ref: sortableRef, isDragging } = useSortable({ index, id: answerId })
    if (answer == null) return null

    const checkboxId = `multiple-choice-answer-correct-${answer.id}`
    const inputId = `multiple-choice-answer-text-${answer.id}`
    const answerElementId = `multiple-choice-answer-${answer.id}`

    const onIsRightChange = (isRight: boolean) => updateAnswer(answer.id, { ...answer, isRight: isRight })
    const onAnswerTextChange = (answerText: string) => updateAnswer(answer.id, { ...answer, answerText: answerText })

    const cardClassName = clsx(
        isDragging && !isDragOverlay && dragClasses["drag-item--is-dragging"],
        isDragOverlay && dragClasses["drag-item--overlay"]
    )

    return (
        <AnimatedStackItem ref={sortableRef} id={answerElementId} >
            <Card tone={2} spacing="s" withBorder className={cardClassName}>

                <Stack gap="s">
                    <Stack direction="row" secondaryAxisAlignment="center" alignment="spaceBetween">
                        <Label htmlFor={inputId}>
                            {getLetterByIndex(index, true) + ") answer option "}
                        </Label>
                        <DragableIcon />
                    </Stack>

                    <Stack gap="s" direction="row" secondaryAxisAlignment="center">
                        <Checkbox
                            id={checkboxId}
                            checked={answer.isRight}
                            onChange={(e) => onIsRightChange(e.target.checked)}
                        />
                        <Input
                            id={inputId}
                            fullWidth
                            tone={3}
                            value={answer.answerText}
                            onChange={(e) => onAnswerTextChange(e.target.value)}
                            placeholder="Answer text"
                        />
                        <IconButton
                            icon={ICON_BUTTON_ICON_MAP.delete}
                            aria-label={`Delete answer option ${index + 1}`}
                            onClick={() => onDelete(answer.id)}
                            disabled={isDeleteDisabled}
                        />
                    </Stack>
                </Stack>
            </Card >
        </AnimatedStackItem>
    );
};

export default MultipleChoiceAnswer;
