import Card from "@/components/ui/Card/Card"
import DragableIcon from "@/components/ui/DragableIcon/DragableIcon"
import Input from "@/components/ui/Input/Input"
import Label from "@/components/ui/Label/Label"
import { Stack } from "@/components/ui/Stack/Stack"
import type {
    TMatchPairsAnswer,
    TMatchPairsAnswerPosition,
} from "@/features/TestConstructor/model/types"
import { useDraggable, useDroppable } from "@dnd-kit/react"
import type { FC } from "react"
import classes from "./MatchPairsQuestion.module.css"

type TMatchPairsAnswerProps = {
    answer: TMatchPairsAnswer
    answerPosition: TMatchPairsAnswerPosition
    inputId: string
    label: string
    pairId: string
    onAnswerChange: (newValue: string, answerPosition: TMatchPairsAnswerPosition) => void
}

const MatchPairsAnswer: FC<TMatchPairsAnswerProps> = ({
    answer,
    answerPosition,
    inputId,
    label,
    pairId,
    onAnswerChange,
}) => {
    const sortableId = `${pairId}-${answerPosition === "leftPair" ? "left" : "right"}`
    const { ref: draggableRef } = useDraggable({ id: sortableId })
    const { ref: droppableRef } = useDroppable({ id: sortableId })

    return (
        <div ref={droppableRef}>
            <Card tone={2} spacing="s" ref={draggableRef}>
                <Stack direction="row" secondaryAxisAlignment="center" gap="s">
                    <Label htmlFor={inputId} className={classes["label"]}>
                        {label}
                    </Label>
                    <Input
                        id={inputId}
                        tone={3}
                        value={answer.answerText}
                        onChange={(event) => onAnswerChange(event.target.value, answerPosition)}
                        placeholder="Answer text"
                        fullWidth
                    />
                    <DragableIcon />
                </Stack>
            </Card>
        </div>
    )
}

export default MatchPairsAnswer
