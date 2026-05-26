import type {
    TFillGapsGap,
    TFillGapsQuestion,
    TMatchPairsAnswerPosition,
    TMatchPairsAnswerPair,
    TMatchPairsQuestion,
    TMultipleChoiceAnswer,
    TMultipleChoiceQuestion,
    TQuestion,
    TShortAnswerAcceptedAnswer,
    TShortAnswerQuestion,
    TTrueFalseQuestion,
} from "@/types/test"
import type { RootStore } from "../types"
import getWrongQuestionTypeError from "@/utils/getWrongQuestionTypeError"

// Common
// ============================================================

const selectDraftName = (state: RootStore) => state.draft.name
const selectQuestionCount = (state: RootStore) => state.draft.questionArr.length
const selectQuestionIds = (state: RootStore) =>
    state.draft.questionArr.map((question) => question.id)

const selectSetTitle = (state: RootStore) => state.setTitle
const selectAddQuestion = (state: RootStore) => state.addQuestion
const selectRemoveQuestion = (state: RootStore) => state.removeQuestion
const selectReorderQuestions = (state: RootStore) => state.reorderQuestions
const selectUpdateQuestion = (state: RootStore) => state.updateQuestion
const selectUpdateQuestionFn = (state: RootStore) => state.updateQuestionFn

const selectQuestionById = (questionId: TQuestion["id"]) => (state: RootStore) =>
    getQuestionById(state, questionId)

// get Question with type
// ============================================================

const selectMultipleChoiceQuestionById =
    (questionId: TMultipleChoiceQuestion["id"]) =>
        (state: RootStore) => {
            const question = getQuestionById(state, questionId)
            if (!question) throw new Error(`Question ${questionId} not found`)
            if (question.type !== "multipleChoice") throw new Error(getWrongQuestionTypeError(question.type, "multipleChoice"))
            return question
        }

const selectTrueFalseQuestionById =
    (questionId: TTrueFalseQuestion["id"]) =>
        (state: RootStore) => {
            const question = getQuestionById(state, questionId)
            if (!question) throw new Error(`Question ${questionId} not found`)
            if (question.type !== "trueFalse") throw new Error(getWrongQuestionTypeError(question.type, "trueFalse"))
            return question
        }

const selectMatchPairsQuestionById =
    (questionId: TMatchPairsQuestion["id"]) =>
        (state: RootStore) => {
            const question = getQuestionById(state, questionId)
            if (!question) throw new Error(`Question ${questionId} not found`)
            if (question.type !== "matchPairs") throw new Error(getWrongQuestionTypeError(question.type, "matchPairs"))
            return question
        }

const selectShortAnswerQuestionById =
    (questionId: TShortAnswerQuestion["id"]) =>
        (state: RootStore) => {
            const question = getQuestionById(state, questionId)
            if (!question) throw new Error(`Question ${questionId} not found`)
            if (question.type !== "shortAnswer") throw new Error(getWrongQuestionTypeError(question.type, "shortAnswer"))
            return question
        }

const selectFillGapsQuestionById =
    (questionId: TFillGapsQuestion["id"]) =>
        (state: RootStore) => {
            const question = getQuestionById(state, questionId)
            if (!question) throw new Error(`Question ${questionId} not found`)
            if (question.type !== "fillGaps") throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
            return question
        }

// Fill Gaps
// ============================================================

const selectFillGapsText = (questionId: TQuestion["id"]) => (state: RootStore) => {
    const question = getQuestionById(state, questionId)
    if (!question) return ""
    if (question.type !== "fillGaps") throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
    return question.questionText
}

const selectFillGapsGapArr = (questionId: TQuestion["id"]) => (state: RootStore): TFillGapsGap[] => {
    const question = getQuestionById(state, questionId)
    if (!question) return []
    if (question.type !== "fillGaps") throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
    return question.gapArr
}

const selectFillGapsGapIds = (questionId: TQuestion["id"]) => (state: RootStore) => {
    const question = getQuestionById(state, questionId)
    if (!question) return []
    if (question.type !== "fillGaps") throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
    return question.gapArr.map((gap) => gap.id)
}

const selectFillGapsGapCount = (questionId: TQuestion["id"]) => (state: RootStore) => {
    const question = getQuestionById(state, questionId)
    if (!question) return 0
    if (question.type !== "fillGaps") throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
    return question.gapArr.length
}

// Multiple Choice
// ============================================================

const selectMultipleChoiceAnswerIds = (questionId: TQuestion["id"]) => (state: RootStore) => {
    const question = getQuestionById(state, questionId)
    if (!question) return []
    if (question.type !== "multipleChoice") throw new Error(getWrongQuestionTypeError(question.type, "multipleChoice"))
    return question.answerArr.map((answer) => answer.id)
}

const selectMultipleChoiceAnswerCount = (questionId: TQuestion["id"]) => (state: RootStore) => {
    const question = getQuestionById(state, questionId)
    if (!question) return 0
    if (question.type !== "multipleChoice") throw new Error(getWrongQuestionTypeError(question.type, "multipleChoice"))
    return question.answerArr.length
}

const selectMultipleChoiceAnswerById =
    (questionId: TQuestion["id"], answerId: TMultipleChoiceAnswer["id"]) =>
        (state: RootStore) => {
            const question = getQuestionById(state, questionId)
            if (!question) return undefined
            if (question.type !== "multipleChoice") throw new Error(getWrongQuestionTypeError(question.type, "multipleChoice"))
            return question.answerArr.find((answer) => answer.id === answerId)
        }

// Match Pairs
// ============================================================

const selectMatchPairsPairIds = (questionId: TQuestion["id"]) => (state: RootStore) => {
    const question = getQuestionById(state, questionId)
    if (!question) return []
    if (question.type !== "matchPairs") throw new Error(getWrongQuestionTypeError(question.type, "matchPairs"))
    return question.pairArr.map((pair) => pair.id)
}

const selectMatchPairsPairCount = (questionId: TQuestion["id"]) => (state: RootStore) => {
    const question = getQuestionById(state, questionId)
    if (!question) return 0
    if (question.type !== "matchPairs") throw new Error(getWrongQuestionTypeError(question.type, "matchPairs"))
    return question.pairArr.length
}

const selectMatchPairsPairById =
    (questionId: TQuestion["id"], pairId: TMatchPairsAnswerPair["id"]) =>
        (state: RootStore) => {
            const question = getQuestionById(state, questionId)
            if (!question) return undefined
            if (question.type !== "matchPairs") throw new Error(getWrongQuestionTypeError(question.type, "matchPairs"))
            return question.pairArr.find((pair) => pair.id === pairId)
        }

const selectMatchPairsAnswerByPosition =
    (
        questionId: TQuestion["id"],
        pairId: TMatchPairsAnswerPair["id"],
        answerPosition: TMatchPairsAnswerPosition
    ) =>
        (state: RootStore) => {
            const question = getQuestionById(state, questionId)
            if (!question) return undefined
            if (question.type !== "matchPairs") throw new Error(getWrongQuestionTypeError(question.type, "matchPairs"))
            return question.pairArr.find((pair) => pair.id === pairId)?.items[answerPosition]
        }

// Short Answer
// ============================================================

const selectShortAnswerIds = (questionId: TQuestion["id"]) => (state: RootStore) => {
    const question = getQuestionById(state, questionId)
    if (!question) return []
    if (question.type !== "shortAnswer") throw new Error(getWrongQuestionTypeError(question.type, "shortAnswer"))
    return question.correctAnswerArr.map((answer) => answer.id)
}

const selectShortAnswerCount = (questionId: TQuestion["id"]) => (state: RootStore) => {
    const question = getQuestionById(state, questionId)
    if (!question) return 0
    if (question.type !== "shortAnswer") throw new Error(getWrongQuestionTypeError(question.type, "shortAnswer"))
    return question.correctAnswerArr.length
}

const selectShortAnswerById =
    (questionId: TQuestion["id"], answerId: TShortAnswerAcceptedAnswer["id"]) =>
        (state: RootStore) => {
            const question = getQuestionById(state, questionId)
            if (!question) return undefined
            if (question.type !== "shortAnswer") throw new Error(getWrongQuestionTypeError(question.type, "shortAnswer"))
            return question.correctAnswerArr.find((answer) => answer.id === answerId)
        }

// Helpers
// ============================================================

const getQuestionById = (state: RootStore, questionId: TQuestion["id"]) =>
    state.draft.questionArr.find((question) => question.id === questionId)

export {
    selectAddQuestion,
    selectDraftName,
    selectFillGapsGapArr,
    selectFillGapsGapCount,
    selectFillGapsGapIds,
    selectFillGapsQuestionById,
    selectFillGapsText,
    selectMatchPairsAnswerByPosition,
    selectMatchPairsPairById,
    selectMatchPairsPairCount,
    selectMatchPairsPairIds,
    selectMatchPairsQuestionById,
    selectMultipleChoiceAnswerById,
    selectMultipleChoiceAnswerCount,
    selectMultipleChoiceAnswerIds,
    selectMultipleChoiceQuestionById,
    selectQuestionById,
    selectQuestionCount,
    selectQuestionIds,
    selectRemoveQuestion,
    selectReorderQuestions,
    selectSetTitle,
    selectShortAnswerById,
    selectShortAnswerCount,
    selectShortAnswerIds,
    selectShortAnswerQuestionById,
    selectTrueFalseQuestionById,
    selectUpdateQuestion,
    selectUpdateQuestionFn,
}
