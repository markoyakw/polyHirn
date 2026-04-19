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
    reorderMatchPairsAnswers,
    updateMatchPairsAnswer,
} from "@/features/TestConstructor/model/utils/update"
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react"

type TMatchPairsQuestionProps = {
    question: TMatchPairsQuestion
}

const MatchPairsQuestion: FC<TMatchPairsQuestionProps> = ({ question }) => {

    const updateQuestion = useStore(state => state.updateQuestion)
    const updateQuestionFn = useStore(state => state.updateQuestionFn)

    const handleMatchPairsAnswerChange = (pairId: string, newValue: string, answerPosition: TMatchPairsAnswerPosition) =>
        updateQuestionFn(question.id, updateMatchPairsAnswer(pairId, answerPosition, newValue))
    const handleMatchPairAnswerAdd = () => updateQuestionFn(question.id, addMatchPairsAnswerPair())
    const handleMatchPairAnswerDelete = (pairId: string) =>
        updateQuestionFn(question.id, deleteMatchPairsAnswerPair(pairId))

    const onDragEnd = (e: DragEndEvent) => {
        const sourceId = e.operation.source?.id?.toString()
        const targetId = e.operation.target?.id?.toString()

        if (sourceId == null || targetId == null || sourceId === targetId) {
            return
        }

        updateQuestionFn(question.id, reorderMatchPairsAnswers(sourceId, targetId))
    }

    return (
        <Stack gap="m">
            <Input placeholder="Question text"
                onChange={e => updateQuestion(question.id, { ...question, questionText: e.target.value })}
                tone={2}
                value={question.questionText}
            />
            <DragDropProvider onDragEnd={onDragEnd}>
                {question.pairArr.map((answerPair, index) =>
                    <MatchPairsAnswerPair
                        answerPair={answerPair}
                        index={index}
                        onAnswerChange={(newValue, answerPosition) => handleMatchPairsAnswerChange(answerPair.id, newValue, answerPosition)}
                        onDelete={handleMatchPairAnswerDelete}
                        isDeleteDisabled={question.pairArr.length <= MINIMUM_MATCH_PAIRS_PAIR_COUNT}
                        key={answerPair.id}
                    />)}
            </DragDropProvider>
            <Button onClick={handleMatchPairAnswerAdd}>
                add new pair +
            </Button>
        </Stack>
    )
}

export default MatchPairsQuestion
