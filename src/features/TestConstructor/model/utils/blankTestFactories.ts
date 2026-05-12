import type {
    TMatchPairsAnswerPair,
    TMatchPairsQuestion,
    TMultipleChoiceQuestion,
    TQuestion,
    TQuestionType,
    TShortAnswerQuestion,
    TTestDraft,
    TTrueFalseQuestion,
    TShortAnswerAcceptedAnswer,
    TMatchPairsAnswer,
    TFillGapsQuestion,
    TFillGapsFillItem,
    TFillGapsTextItem,
} from "@/types/test"

const DEFAULT_DRAFT_QUESTION_ID = "default-question-1"
const DEFAULT_DRAFT_ANSWER_IDS = [
    "default-answer-1",
    "default-answer-2",
] as const
const DEFAULT_POINTS_PER_ANSWER = 1
const DEFAULT_POINTS_PER_QUESTION = 1

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
        case "fillGaps":
            return getBlankFillGapsQuestion(id)
    }
}

const getBlankMultipleChoiceAnswer = (passedId?: string) => {
    return {
        id: passedId || crypto.randomUUID(),
        answerText: "",
        isRight: false,
    }
}

const getBlankMultipleChoiceQuestion = (
    id: string,
    answerIds?: readonly string[]
): TMultipleChoiceQuestion => {
    return {
        id,
        type: "multipleChoice",
        questionText: "",
        pointsPerAnswer: DEFAULT_POINTS_PER_ANSWER,
        answerArr: [
            getBlankMultipleChoiceAnswer(answerIds?.[0]),
            getBlankMultipleChoiceAnswer(answerIds?.[1]),
        ],
    }
}

const getBlankTrueFalseQuestion = (
    id: string
): TTrueFalseQuestion => {
    return {
        id,
        type: "trueFalse",
        questionText: "",
        pointsPerQuestion: DEFAULT_POINTS_PER_QUESTION,
        answer: null,
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

const getBlankMatchPairsPair = (passedId?: string): TMatchPairsAnswerPair => {
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
    id: string
): TMatchPairsQuestion => {
    return {
        id,
        type: "matchPairs",
        questionText: "",
        pointsPerAnswer: DEFAULT_POINTS_PER_ANSWER,
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
    id: string
): TShortAnswerQuestion => {
    return {
        id,
        type: "shortAnswer",
        questionText: "",
        pointsPerQuestion: DEFAULT_POINTS_PER_QUESTION,
        correctAnswerArr: [
            getBlankShortAnswer(),
        ],
    }
}

const getBlankFillGapsQuestion = (
    id: string
): TFillGapsQuestion => {
    return {
        id,
        type: "fillGaps",
        questionText: "",
        pointsPerAnswer: DEFAULT_POINTS_PER_ANSWER,
        items: [
            getBlankFillGapsTextItem(),
            getBlankFillGapsFillItem(),
        ]
    }
}

const getBlankFillGapsTextItem = (passedId?: string): TFillGapsTextItem => {
    return {
        id: passedId || crypto.randomUUID(),
        type: "text",
        text: "",
    }
}

const getBlankFillGapsFillItem = (passedId?: string): TFillGapsFillItem => {
    return {
        id: passedId || crypto.randomUUID(),
        type: "fill",
        correctAnswerArr: [
            getBlankFillGapsAcceptedAnswer()
        ],
    }
}

const getBlankFillGapsAcceptedAnswer = (): TFillGapsFillItem["correctAnswerArr"][number] => {
    return {
        id: crypto.randomUUID(),
        answer: "",
    }
}


const getDefaultDraft: () => TTestDraft = () => ({
    name: "",
    passPoints: 50,
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
    getBlankFillGapsAcceptedAnswer,
    getBlankFillGapsFillItem,
    getBlankFillGapsQuestion,
    getBlankFillGapsTextItem,
    getBlankMatchPairsPair,
    getBlankMatchPairsAnswer,
}
