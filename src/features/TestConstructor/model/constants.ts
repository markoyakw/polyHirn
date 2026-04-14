import { TQuestionType, TTest } from "./types"

const QUESTION_TYPE_LABELS: Record<TQuestionType, string> = {
    connectPairs: "Connect pairs",
    multipleChoice: "Multiple Choice",
    shortAnswer: "Short text answer",
    trueFalse: "True or false",
}

const QUESTION_TYPE_ORDER: TQuestionType[] = [
    "connectPairs",
    "multipleChoice",
    "shortAnswer",
    "trueFalse",
]

const DEFAULT_DRAFT: TTest = {
    name: "",
    passMark: 50,
    questionArr: [],
}

export {
    QUESTION_TYPE_LABELS,
    QUESTION_TYPE_ORDER,
    DEFAULT_DRAFT
}