import getWrongQuestionTypeError from "@/utils/getWrongQuestionTypeError"
import type {
    TMatchPairsAnswerPosition,
    TMatchPairsQuestion,
    TQuestion,
} from "../../types"
import { getBlankMatchPairsPair } from "../blankTestFactories"

const MINIMUM_MATCH_PAIRS_PAIR_COUNT = 2

const updateMatchPairsAnswer = (
    pairId: string,
    answerPosition: TMatchPairsAnswerPosition,
    newValue: string,
) =>
    (question: TQuestion): TMatchPairsQuestion => {
        if (question.type !== "matchPairs") {
            throw new Error(getWrongQuestionTypeError(question.type, "matchPairs"))
        }

        return {
            ...question,
            pairArr: question.pairArr.map((pair) => {
                if (pair.id === pairId) {
                    return {
                        ...pair,
                        [answerPosition]: {
                            ...pair[answerPosition],
                            answerText: newValue,
                        },
                    }
                }

                return pair
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

const reorderMatchPairsAnswers = (
    sourceId: string,
    targetId: string,
) =>
    (question: TQuestion): TQuestion => {
        if (question.type !== "matchPairs") {
            throw new Error("Question type mismatch. Expected matchPairs, got " + question.type)
        }

        const getPairPositionFromId = (id: string): TMatchPairsAnswerPosition | null => {
            if (id.endsWith("-left")) return "leftPair"
            if (id.endsWith("-right")) return "rightPair"
            return null
        }

        const sourcePosition = getPairPositionFromId(sourceId)
        const targetPosition = getPairPositionFromId(targetId)

        const sourcePair = question.pairArr.find(
            (pair) => sourceId === pair.id + "-right" || sourceId === pair.id + "-left"
        )
        const targetPair = question.pairArr.find(
            (pair) => targetId === pair.id + "-right" || targetId === pair.id + "-left"
        )

        if (
            sourcePair == null ||
            targetPair == null ||
            sourcePosition == null ||
            targetPosition == null
        ) {
            throw new Error(
                "Could not reorder match pairs answers: " +
                "sourcePair = " + String(sourcePair) + ", " +
                "targetPair = " + String(targetPair) + ", " +
                "sourcePosition = " + String(sourcePosition) + ", " +
                "targetPosition = " + String(targetPosition) + ", " +
                "sourceId = " + String(sourceId) + ", " +
                "targetId = " + String(targetId)
            )
        }

        if (sourcePair.id === targetPair.id) {
            const sourceValue = sourcePosition === "leftPair" ? sourcePair.leftPair : sourcePair.rightPair
            const targetValue = targetPosition === "leftPair" ? targetPair.leftPair : targetPair.rightPair

            return {
                ...question,
                pairArr: question.pairArr.map((pair) => {
                    if (pair.id !== sourcePair.id) {
                        return pair
                    }

                    return {
                        ...pair,
                        [sourcePosition]: targetValue,
                        [targetPosition]: sourceValue,
                    }
                }),
            }
        }

        return {
            ...question,
            pairArr: question.pairArr.map((pair) => {
                if (pair.id === sourcePair.id) {
                    return {
                        ...pair,
                        [sourcePosition === "leftPair" ? "leftPair" : "rightPair"]:
                            targetPosition === "leftPair" ? targetPair.leftPair : targetPair.rightPair,
                    }
                }

                if (pair.id === targetPair.id) {
                    return {
                        ...pair,
                        [targetPosition === "leftPair" ? "leftPair" : "rightPair"]:
                            sourcePosition === "leftPair" ? sourcePair.leftPair : sourcePair.rightPair,
                    }
                }

                return pair
            }),
        }
    }

export {
    MINIMUM_MATCH_PAIRS_PAIR_COUNT,
    addMatchPairsAnswerPair,
    deleteMatchPairsAnswerPair,
    reorderMatchPairsAnswers,
    updateMatchPairsAnswer,
}
