import type { FC } from "react"
import type { TMatchPairsAnswerPosition, TMatchPairsQuestion } from "../../../model/types"
import Input from "@/components/ui/Input/Input"
import { useStore } from "@/store"
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

type TMatchPairsQuestionProps = {
    question: TMatchPairsQuestion
}

const MatchPairsQuestion: FC<TMatchPairsQuestionProps> = ({ question }) => {
    const updateQuestion = useStore(state => state.updateQuestion)
    const updateQuestionFn = useStore(state => state.updateQuestionFn)

    const handleMatchPairsAnswerChange = (
        pairId: string,
        answerPosition: TMatchPairsAnswerPosition,
        newValue: string
    ) => updateQuestionFn(question.id, updateMatchPairsAnswer(pairId, answerPosition, newValue))

    const handleMatchPairAnswerAdd = () => updateQuestionFn(question.id, addMatchPairsAnswerPair())
    const handleMatchPairAnswerDelete = (pairId: string) =>
        updateQuestionFn(question.id, deleteMatchPairsAnswerPair(pairId))

    const { draggedAnswerData, onDragEnd, onDragStart } = useMatchPairsDrag({
        question,
        onQuestionUpdate: (update) =>
            updateQuestionFn(question.id, (draftQuestion) =>
                update(draftQuestion as TMatchPairsQuestion)
            ),
    })

    const draggedAnswerViewData = draggedAnswerData == null
        ? null
        : getDraggedMatchPairsAnswerViewData(question, draggedAnswerData)

    return (
        <DragDropProvider onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Stack gap="m" className={classes["question"]}>
                <Input
                    placeholder="Question text"
                    onChange={e => updateQuestion(question.id, { ...question, questionText: e.target.value })}
                    tone={2}
                    value={question.questionText}
                />
                <Stack gap="s" className={classes["pair-list"]}>
                    <AnimatePresence>
                        {question.pairArr.map((answerPair, index) =>
                            <MatchPairsAnswerPair
                                answerPair={answerPair}
                                index={index}
                                onAnswerChange={handleMatchPairsAnswerChange}
                                onDelete={handleMatchPairAnswerDelete}
                                isDeleteDisabled={question.pairArr.length <= MINIMUM_MATCH_PAIRS_PAIR_COUNT}
                                key={answerPair.id}
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
            <MatchPairsDragOverlay draggedAnswerViewData={draggedAnswerViewData} />
        </DragDropProvider >
    )
}

export default MatchPairsQuestion
