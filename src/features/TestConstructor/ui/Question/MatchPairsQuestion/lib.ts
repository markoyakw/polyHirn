import type {
    TMatchPairsAnswer,
    TMatchPairsAnswerPosition,
    TMatchPairsQuestion,
} from "@/features/TestConstructor/model/types"
import getLetterByIndex from "@/utils/getLetterByIndex"

type TDraggedMatchPairsAnswer = {
    answerId: string
    pairId: string
    answerPosition: TMatchPairsAnswerPosition
}

type TDraggedMatchPairsAnswerViewData = {
    answer: TMatchPairsAnswer
    answerPosition: TMatchPairsAnswerPosition
    pairId: string
    index: number
    label: string
}

const getMatchPairsAnswerLabel = (
    pairIndex: number,
    answerPosition: TMatchPairsAnswerPosition
) => {
    return answerPosition === 0
        ? `${pairIndex + 1})`
        : `${getLetterByIndex(pairIndex, true)})`
}

const getMatchPairsAnswerFlatIndex = (
    pairIndex: number,
    answerPosition: TMatchPairsAnswerPosition
) => {
    return pairIndex * 2 + answerPosition
}

const getDraggedMatchPairsAnswerDataById = (
    question: TMatchPairsQuestion,
    answerId: string
): TDraggedMatchPairsAnswer | null => {
    for (const pair of question.pairArr) {
        for (const [answerPosition, answer] of pair.items.entries()) {
            if (answer.id === answerId) {
                return {
                    answerId,
                    pairId: pair.id,
                    answerPosition: answerPosition as TMatchPairsAnswerPosition,
                }
            }
        }
    }

    return null
}

const getDraggedMatchPairsAnswerViewData = (
    question: TMatchPairsQuestion,
    draggedAnswerData: TDraggedMatchPairsAnswer
): TDraggedMatchPairsAnswerViewData | null => {
    const pairIndex = question.pairArr.findIndex((pair) => pair.id === draggedAnswerData.pairId)

    if (pairIndex === -1) {
        return null
    }

    const answer = question.pairArr[pairIndex].items[draggedAnswerData.answerPosition]

    return {
        answer,
        answerPosition: draggedAnswerData.answerPosition,
        pairId: draggedAnswerData.pairId,
        index: getMatchPairsAnswerFlatIndex(pairIndex, draggedAnswerData.answerPosition),
        label: getMatchPairsAnswerLabel(pairIndex, draggedAnswerData.answerPosition),
    }
}

export {
    getDraggedMatchPairsAnswerDataById,
    getDraggedMatchPairsAnswerViewData,
    getMatchPairsAnswerFlatIndex,
    getMatchPairsAnswerLabel,
}

export type { TDraggedMatchPairsAnswer, TDraggedMatchPairsAnswerViewData }
