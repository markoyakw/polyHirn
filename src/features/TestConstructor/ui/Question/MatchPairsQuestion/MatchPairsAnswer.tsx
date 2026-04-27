import DragableIcon from "@/components/ui/DragableIcon/DragableIcon"
import Card from "@/components/ui/Card/Card"
import Input from "@/components/ui/Input/Input"
import Label from "@/components/ui/Label/Label"
import { Stack } from "@/components/ui/Stack/Stack"
import type {
    TMatchPairsAnswer,
    TMatchPairsAnswerPosition,
} from "@/features/TestConstructor/model/types"
import type { FC } from "react"
import classes from "./MatchPairsQuestion.module.css"
import { useSortable } from "@dnd-kit/react/sortable"
import clsx from "clsx"
import dragClasses from "@/globalStyles/drag.module.css"
import { motion } from "motion/react"

type TMatchPairsAnswerProps = {
    answer: TMatchPairsAnswer
    answerPosition: TMatchPairsAnswerPosition
    pairId: string
    inputId: string
    label: string
    onAnswerChange: (
        pairId: string,
        answerPosition: TMatchPairsAnswerPosition,
        newValue: string
    ) => void,
    index: number
    isDragOverlay?: boolean
}

const MatchPairsAnswer: FC<TMatchPairsAnswerProps> = ({
    answer,
    answerPosition,
    pairId,
    inputId,
    label,
    onAnswerChange,
    index,
    isDragOverlay
}) => {
    const { sourceRef, targetRef, handleRef, isDragging, isDropTarget } = useSortable({
        id: answer.id,
        index,
        type: "match-pair-answer",
        accept: "match-pair-answer",
        data: {
            answerId: answer.id,
            pairId,
            answerPosition,
        },
    })

    const cardClassName = clsx(
        classes["answer-card"],
        isDropTarget && dragClasses["drag-target"],
        isDragging && !isDragOverlay && dragClasses["drag-item--is-dragging"],
        isDragOverlay && dragClasses["drag-item--overlay"]
    )

    return (
        <motion.div
            ref={targetRef}
            layout="position"
            layoutId={isDragOverlay ? undefined : answer.id}
            transition={{
                type: "spring",
                stiffness: 700,
                damping: 38,
            }}
            className={classes["answer-target"]}
        >
            <Card tone={2} spacing="s" ref={sourceRef} className={cardClassName}>
                <Stack direction="row" secondaryAxisAlignment="center" gap="s">
                    <Label htmlFor={inputId} className={classes["label"]}>
                        {label}
                    </Label>
                    <Input
                        id={inputId}
                        tone={3}
                        value={answer.answerText}
                        onChange={(event) => onAnswerChange(pairId, answerPosition, event.target.value)}
                        placeholder="Answer text"
                        fullWidth
                    />
                    <span ref={handleRef} className={classes["drag-handle"]}>
                        <DragableIcon />
                    </span>
                </Stack>
            </Card>
        </motion.div>
    )
}

export default MatchPairsAnswer
