import { TQuestionType } from "./types"

const QUESTION_TYPE_LABELS: Record<TQuestionType, string> = {
    matchPairs: "Match pairs",
    multipleChoice: "Multiple Choice",
    shortAnswer: "Short text answer",
    trueFalse: "True or false",
    fillGaps: "Fill the gaps"
}

const QUESTION_TYPE_ORDER: TQuestionType[] = [
    "matchPairs",
    "multipleChoice",
    "shortAnswer",
    "trueFalse",
    "fillGaps",
]

export {
    QUESTION_TYPE_LABELS,
    QUESTION_TYPE_ORDER,
}
