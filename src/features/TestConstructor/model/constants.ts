import { TQuestionType, TTest } from "./types"
import { getBlankQuestion } from "./utils/blankTestFactories"

const QUESTION_TYPE_LABELS: Record<TQuestionType, string> = {
    matchPairs: "Match pairs",
    multipleChoice: "Multiple Choice",
    shortAnswer: "Short text answer",
    trueFalse: "True or false",
}

const QUESTION_TYPE_ORDER: TQuestionType[] = [
    "matchPairs",
    "multipleChoice",
    "shortAnswer",
    "trueFalse",
]

export {
    QUESTION_TYPE_LABELS,
    QUESTION_TYPE_ORDER,
}