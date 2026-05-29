"use client"
import { type FC } from "react"
import type { TMatchPairsAnswer, TMatchPairsQuestion } from "@/types/test"
import type { TStudentAnswer, TStudentMatchPairsAnswer } from "../../../model/studentAnswer"
import { DragDropProvider, DragOverlay, type DragEndEvent } from "@dnd-kit/react"
import { Stack } from "@/components/ui/Stack/Stack"
import Portal from "@/components/ui/Portal/Portal"
import { AnswerPair } from "./AnswerPair"
import { AnswerPool } from "./AnswerPool"
import dragClasses from "@/globalStyles/drag.module.css"
import { AnswerCard } from "./AnswerCard"

type TQuestionProps = {
    question: TMatchPairsQuestion
    answer: TStudentMatchPairsAnswer
    onAnswerChange: (answer: TStudentAnswer) => void
}

const Question: FC<TQuestionProps> = ({ question, answer, onAnswerChange }) => {

    const rightItems = question.pairArr.map((pair) => pair.items[1])
    const assignedIds = new Set(Object.values(answer.pairedItemIds))
    const poolItems = rightItems.filter((item) => !assignedIds.has(item.id))

    const handleDragEnd = (e: DragEndEvent) => {
        const sourceId = e.operation.source?.id?.toString()
        const targetId = e.operation.target?.id?.toString()

        if (!sourceId) return

        const newPairedItemIds = { ...answer.pairedItemIds }

        // Find which slot the dragged item currently occupies (undefined = it came from the pool)
        const sourceSlot = Object.keys(newPairedItemIds).find(
            (key) => newPairedItemIds[key] === sourceId
        )

        if (!targetId || targetId === "pool") {
            // Dropped outside or back on pool — return item to pool
            if (sourceSlot) delete newPairedItemIds[sourceSlot]
        } else {
            const existingItemAtTarget = newPairedItemIds[targetId]

            if (existingItemAtTarget) {
                // Target slot is occupied — swap the two items
                if (sourceSlot) {
                    // Source came from a slot: send the displaced item there
                    newPairedItemIds[sourceSlot] = existingItemAtTarget
                }
                // Source came from the pool: displaced item goes back to the pool
                // (its slot entry is overwritten below, no extra step needed)
            } else if (sourceSlot) {
                // Target slot is empty and source came from a slot — vacate the old slot
                delete newPairedItemIds[sourceSlot]
            }

            newPairedItemIds[targetId] = sourceId
        }

        onAnswerChange({ ...answer, pairedItemIds: newPairedItemIds })
    }

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <Stack gap="m">
                <Stack gap="s">
                    {question.pairArr.map((pair) => {
                        const assignedRightItem = rightItems.find(
                            (item) => item.id === answer.pairedItemIds[pair.items[0].id]
                        )
                        return (
                            <AnswerPair
                                key={pair.id}
                                pair={pair}
                                assignedRightItem={assignedRightItem}
                            />
                        )
                    })}
                </Stack>

                <AnswerPool items={poolItems} />
            </Stack>

            <Portal>
                <DragOverlay className={dragClasses["drag-overlay"]} dropAnimation={null}>
                    {(source) => {
                        // data shape is guaranteed by the data parameter passed in DraggablePairAnswer's useDraggable call
                        const item = source.data as TMatchPairsAnswer
                        return <AnswerCard item={item} />
                    }}
                </DragOverlay>
            </Portal>
        </DragDropProvider>
    )
}

export default Question
