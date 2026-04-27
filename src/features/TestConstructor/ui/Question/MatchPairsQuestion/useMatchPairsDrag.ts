import type { TMatchPairsQuestion } from "@/features/TestConstructor/model/types"
import { reorderMatchPairsAnswers } from "@/features/TestConstructor/model/utils/update"
import { isSortable } from "@dnd-kit/react/sortable"
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/react"
import { useState } from "react"
import {
    getDraggedMatchPairsAnswerDataById,
    type TDraggedMatchPairsAnswer,
} from "./lib"

type TUseMatchPairsDragProps = {
    question: TMatchPairsQuestion
    onQuestionUpdate: (update: (question: TMatchPairsQuestion) => TMatchPairsQuestion) => void
}

const useMatchPairsDrag = ({
    question,
    onQuestionUpdate,
}: TUseMatchPairsDragProps) => {
    const [draggedAnswerData, setDraggedAnswerData] = useState<TDraggedMatchPairsAnswer | null>(null)

    const onDragStart = (e: DragStartEvent) => {
        const { source } = e.operation

        if (!isSortable(source)) {
            return
        }

        const sourceData = source.data as TDraggedMatchPairsAnswer | undefined

        if (sourceData == null) {
            return
        }

        setDraggedAnswerData(sourceData)
    }

    const onDragEnd = (e: DragEndEvent) => {
        const { target } = e.operation

        if (target?.id == null || draggedAnswerData == null) {
            setDraggedAnswerData(null)
            return
        }

        const targetData = getDraggedMatchPairsAnswerDataById(question, target.id.toString())

        if (
            targetData != null &&
            (
                draggedAnswerData.pairId !== targetData.pairId ||
                draggedAnswerData.answerPosition !== targetData.answerPosition
            )
        ) {
            onQuestionUpdate(
                reorderMatchPairsAnswers(
                    draggedAnswerData.pairId,
                    draggedAnswerData.answerPosition,
                    targetData.pairId,
                    targetData.answerPosition
                )
            )
        }

        setDraggedAnswerData(null)
    }

    return {
        draggedAnswerData,
        onDragEnd,
        onDragStart,
    }
}

export { useMatchPairsDrag }
