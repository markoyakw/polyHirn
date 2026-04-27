import getWrongQuestionTypeError from "@/utils/getWrongQuestionTypeError"
import type {
    TMatchPairsAnswerPosition,
    TMatchPairsQuestion,
    TQuestion,
} from "../../types"
import { getBlankMatchPairsPair } from "../blankTestFactories"

const MINIMUM_MATCH_PAIRS_PAIR_COUNT = 2

const getPairIndexById = (question: TMatchPairsQuestion, pairId: string) => {
    return question.pairArr.findIndex((pair) => pair.id === pairId)
}

const updatePairByIndex = (
    question: TMatchPairsQuestion,
    pairIndex: number,
    update: (pair: TMatchPairsQuestion["pairArr"][number]) => TMatchPairsQuestion["pairArr"][number]
): TMatchPairsQuestion["pairArr"] => {
    return question.pairArr.map((pair, index) => {
        return index === pairIndex ? update(pair) : pair
    })
}

const updateMatchPairsAnswer = (
    pairId: string,
    answerPosition: TMatchPairsAnswerPosition,
    newValue: string,
) =>
    (question: TQuestion): TMatchPairsQuestion => {
        if (question.type !== "matchPairs") {
            throw new Error(getWrongQuestionTypeError(question.type, "matchPairs"))
        }

        const pairIndex = getPairIndexById(question, pairId)

        if (pairIndex === -1) {
            throw new Error("Pair was not found")
        }

        return {
            ...question,
            pairArr: updatePairByIndex(question, pairIndex, (pair) => {
                const newItems = [...pair.items] as typeof pair.items
                newItems[answerPosition] = {
                    ...newItems[answerPosition],
                    answerText: newValue,
                }

                return {
                    ...pair,
                    items: newItems,
                }
            }),
        }
    }

const addMatchPairsAnswerPair = () => (question: TQuestion): TMatchPairsQuestion => {
    if (question.type !== "matchPairs") {
        throw new Error(getWrongQuestionTypeError(question.type, "matchPairs"))
    }

    return { ...question, pairArr: [...question.pairArr, getBlankMatchPairsPair()] }
}

const deleteMatchPairsAnswerPair = (pairId: string) =>
    (question: TQuestion): TMatchPairsQuestion => {
        if (question.type !== "matchPairs") {
            throw new Error(getWrongQuestionTypeError(question.type, "matchPairs"))
        }

        if (question.pairArr.length <= MINIMUM_MATCH_PAIRS_PAIR_COUNT) {
            return question
        }

        return {
            ...question,
            pairArr: question.pairArr.filter((pair) => pair.id !== pairId),
        }
    }

const reorderMatchPairsAnswers =
    (
        sourcePairId: string,
        sourceAnswerPosition: TMatchPairsAnswerPosition,
        targetPairId: string,
        targetAnswerPosition: TMatchPairsAnswerPosition,
    ) =>
        (question: TQuestion): TMatchPairsQuestion => {
            if (question.type !== "matchPairs") {
                throw new Error(getWrongQuestionTypeError(question.type, "matchPairs"))
            }

            if (
                sourcePairId === targetPairId &&
                sourceAnswerPosition === targetAnswerPosition
            ) {
                return question
            }

            const sourcePairIndex = getPairIndexById(question, sourcePairId)
            const targetPairIndex = getPairIndexById(question, targetPairId)

            if (sourcePairIndex === -1 || targetPairIndex === -1) {
                throw new Error("Source or target pair was not found")
            }

            const sourceItem = question.pairArr[sourcePairIndex].items[sourceAnswerPosition]
            const targetItem = question.pairArr[targetPairIndex].items[targetAnswerPosition]

            const newPairArr = question.pairArr.map((pair, pairIndex) => {
                if (pairIndex === sourcePairIndex && pairIndex === targetPairIndex) {
                    const newItems = [...pair.items] as typeof pair.items
                    newItems[sourceAnswerPosition] = targetItem
                    newItems[targetAnswerPosition] = sourceItem

                    return {
                        ...pair,
                        items: newItems,
                    }
                }

                if (pairIndex === sourcePairIndex) {
                    const newItems = [...pair.items] as typeof pair.items
                    newItems[sourceAnswerPosition] = targetItem

                    return {
                        ...pair,
                        items: newItems,
                    }
                }

                if (pairIndex === targetPairIndex) {
                    const newItems = [...pair.items] as typeof pair.items
                    newItems[targetAnswerPosition] = sourceItem

                    return {
                        ...pair,
                        items: newItems,
                    }
                }

                return pair
            })

            return { ...question, pairArr: newPairArr }
        }

export {
    MINIMUM_MATCH_PAIRS_PAIR_COUNT,
    addMatchPairsAnswerPair,
    deleteMatchPairsAnswerPair,
    reorderMatchPairsAnswers,
    updateMatchPairsAnswer,
}
