import type {
    TMatchPairsAnswerPair,
    TMultipleChoiceAnswer,
    TMatchPairsQuestion,
    TMultipleChoiceQuestion,
    TQuestion,
    TQuestionType,
    TShortAnswerQuestion,
    TTest,
    TTrueFalseQuestion,
    TShortAnswerAcceptedAnswer,
    TMatchPairsAnswer,
    TMatchPairsAnswerPosition,
} from "../types"

const DEFAULT_DRAFT_QUESTION_ID = "default-question-1"
const DEFAULT_DRAFT_ANSWER_IDS = [
    "default-answer-1",
    "default-answer-2",
] as const

const getBlankQuestion = (type: TQuestionType, passedId?: string): TQuestion => {
    const id = passedId || crypto.randomUUID()
    switch (type) {
        case "multipleChoice":
            return getBlankMultipleChoiceQuestion(id)
        case "trueFalse":
            return getBlankTrueFalseQuestion(id)
        case "matchPairs":
            return getBlankMatchPairsQuestion(id)
        case "shortAnswer":
            return getBlankShortAnswerQuestion(id)
    }
}

const getBlankMultipleChoiceAnswer = (passedId?: TMultipleChoiceAnswer["id"]) => {
    return {
        id: passedId || crypto.randomUUID(),
        answerText: "",
        isRight: false,
    }
}

const getBlankMultipleChoiceQuestion = (
    id: TMultipleChoiceQuestion["id"],
    answerIds?: readonly TMultipleChoiceAnswer["id"][]
): TMultipleChoiceQuestion => {
    return {
        id,
        type: "multipleChoice",
        questionText: "",
        answerArr: [
            getBlankMultipleChoiceAnswer(answerIds?.[0]),
            getBlankMultipleChoiceAnswer(answerIds?.[1]),
        ],
    }
}

const getBlankTrueFalseQuestion = (
    id: TTrueFalseQuestion["id"]
): TTrueFalseQuestion => {
    return {
        id,
        type: "trueFalse",
        questionText: "",
        correctAnswer: null,
    }
}


const getBlankMatchPairsAnswer = (
    passedId?: string
): TMatchPairsAnswer => {
    const id = passedId || crypto.randomUUID()
    return {
        id,
        answerText: ""
    }
}

const getBlankMatchPairsPair = (passedId?: TMatchPairsAnswerPair["id"]): TMatchPairsAnswerPair => {
    const id = passedId || crypto.randomUUID()
    return {
        id,
        items: [
            getBlankMatchPairsAnswer(),
            getBlankMatchPairsAnswer()
        ]
    }
}

const getBlankMatchPairsQuestion = (
    id: TMatchPairsQuestion["id"]
): TMatchPairsQuestion => {
    return {
        id,
        type: "matchPairs",
        questionText: "",
        pairArr: [
            getBlankMatchPairsPair(),
            getBlankMatchPairsPair()
        ],
    }
}

const getBlankShortAnswer = (passedId?: string): TShortAnswerAcceptedAnswer => {
    return {
        id: passedId || crypto.randomUUID(),
        answerText: ""
    }
}

const getBlankShortAnswerQuestion = (
    id: TShortAnswerQuestion["id"]
): TShortAnswerQuestion => {
    return {
        id,
        type: "shortAnswer",
        questionText: "",
        correctAnswerArr: [
            getBlankShortAnswer(),
        ],
    }
}


const getDefaultDraft: () => TTest = () => ({
    name: "",
    passMark: 50,
    questionArr: [
        getBlankMultipleChoiceQuestion(
            DEFAULT_DRAFT_QUESTION_ID,
            DEFAULT_DRAFT_ANSWER_IDS
        ),
    ],
})

export {
    getBlankMatchPairsQuestion,
    getBlankMultipleChoiceQuestion,
    getBlankQuestion,
    getBlankShortAnswer,
    getBlankShortAnswerQuestion,
    getBlankTrueFalseQuestion,
    getBlankMultipleChoiceAnswer,
    getDefaultDraft,
    getBlankMatchPairsPair,
    getBlankMatchPairsAnswer,
}
