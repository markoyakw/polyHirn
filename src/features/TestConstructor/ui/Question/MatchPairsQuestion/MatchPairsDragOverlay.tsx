import type { FC } from "react"
import { DragOverlay } from "@dnd-kit/react"
import Portal from "@/components/ui/Portal/Portal"
import MatchPairsAnswer from "./MatchPairsAnswer"
import classes from "./MatchPairsQuestion.module.css"
import type { TDraggedMatchPairsAnswerViewData } from "./lib"

type TMatchPairsDragOverlayProps = {
    draggedAnswerViewData: TDraggedMatchPairsAnswerViewData | null
}

const MatchPairsDragOverlay: FC<TMatchPairsDragOverlayProps> = ({
    draggedAnswerViewData,
}) => {
    return (
        <Portal>
            <DragOverlay dropAnimation={null}>
                {() => {
                    if (draggedAnswerViewData == null) {
                        return null
                    }

                    return (
                        <div className={classes["overlay"]}>
                            <MatchPairsAnswer
                                answer={draggedAnswerViewData.answer}
                                answerPosition={draggedAnswerViewData.answerPosition}
                                pairId={draggedAnswerViewData.pairId}
                                inputId={`match-pairs-overlay-${draggedAnswerViewData.answer.id}`}
                                label={draggedAnswerViewData.label}
                                onAnswerChange={() => { }}
                                index={draggedAnswerViewData.index}
                                isDragOverlay
                            />
                        </div>
                    )
                }}
            </DragOverlay>
        </Portal>
    )
}

export default MatchPairsDragOverlay
