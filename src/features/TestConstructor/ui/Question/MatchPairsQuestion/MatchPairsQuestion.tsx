import type { FC } from "react"
import type { TMatchPairsAnswerPosition, TMatchPairsQuestion } from "@/types/test"
import Input from "@/components/ui/Input/Input"
import { useStore } from "@/store"
import {
    selectMatchPairsPairCount,
    selectMatchPairsPairIds,
    selectMatchPairsQuestionById,
    selectUpdateQuestion,
    selectUpdateQuestionFn,
} from "@/store/slices/testConstructor.selectors"
import MatchPairsAnswerPair from "./MatchPairsAnswerPair"
import Button from "@/components/ui/Button/Button"
import { Stack } from "@/components/ui/Stack/Stack"
import {
    MINIMUM_MATCH_PAIRS_PAIR_COUNT,
    addMatchPairsAnswerPair,
    deleteMatchPairsAnswerPair,
    updateMatchPairsAnswer,
} from "@/features/TestConstructor/model/utils/update"
import { DragDropProvider } from "@dnd-kit/react"
import { AnimatePresence } from "motion/react"
import classes from "./MatchPairsQuestion.module.css"
import { getDraggedMatchPairsAnswerViewData } from "./lib"
import { useMatchPairsDrag } from "./useMatchPairsDrag"
import Text from "@/components/ui/Text/Text"
import MatchPairsDragOverlay from "./MatchPairsDragOverlay"
import { useShallow } from "zustand/react/shallow"

type TMatchPairsQuestionProps = {
    questionId: TMatchPairsQuestion["id"]
}

const MatchPairsQuestion: FC<TMatchPairsQuestionProps> = ({ questionId }) => {
    const question = useStore(selectMatchPairsQuestionById(questionId))
    const pairIds = useStore(useShallow(selectMatchPairsPairIds(questionId)))
    const pairCount = useStore(selectMatchPairsPairCount(questionId))
    const updateQuestion = useStore(selectUpdateQuestion)
    const updateQuestionFn = useStore(selectUpdateQuestionFn)

    const handleMatchPairsAnswerChange = (
        pairId: string,
        answerPosition: TMatchPairsAnswerPosition,
        newValue: string
    ) => updateQuestionFn(questionId, updateMatchPairsAnswer(pairId, answerPosition, newValue))

    const handleMatchPairAnswerAdd = () => updateQuestionFn(questionId, addMatchPairsAnswerPair())
    const handleMatchPairAnswerDelete = (pairId: string) =>
        updateQuestionFn(questionId, deleteMatchPairsAnswerPair(pairId))

    const { draggedAnswerData, onDragEnd, onDragStart } = useMatchPairsDrag({
        question,
        onQuestionUpdate: (update) =>
            updateQuestionFn<TMatchPairsQuestion>(questionId, update),
    })

    const draggedAnswerViewData = draggedAnswerData == null
        ? null
        : getDraggedMatchPairsAnswerViewData(question, draggedAnswerData)

    return (
        <DragDropProvider onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Stack gap="m" className={classes["question"]}>
                <Input
                    placeholder="Question text"
                    onChange={e => updateQuestion(questionId, { questionText: e.target.value })}
                    tone={2}
                    value={question.questionText}
                />
                <Stack gap="s" className={classes["pair-list"]}>
                    <AnimatePresence>
                        {pairIds.map((pairId, index) =>
                            <MatchPairsAnswerPair
                                questionId={questionId}
                                pairId={pairId}
                                index={index}
                                onAnswerChange={handleMatchPairsAnswerChange}
                                onDelete={handleMatchPairAnswerDelete}
                                isDeleteDisabled={pairCount <= MINIMUM_MATCH_PAIRS_PAIR_COUNT}
                                key={pairId}
                            />)}
                    </AnimatePresence>
                </Stack>
                <Text>
                    Drag any answer onto another one to swap their places.
                </Text>
                <Button onClick={handleMatchPairAnswerAdd} fullWidth>
                    add new pair +
                </Button>
            </Stack>
            <MatchPairsDragOverlay
                draggedAnswerViewData={draggedAnswerViewData}
                questionId={questionId}
            />
        </DragDropProvider >
    )
}

export default MatchPairsQuestion
