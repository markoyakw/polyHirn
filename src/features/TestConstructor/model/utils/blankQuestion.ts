import type {
    TConnectPairsQuestion,
    TMultipleChoiceQuestion,
    TQuestion,
    TQuestionType,
    TShortAnswerQuestion,
    TTrueFalseQuestion,
} from "../types"

const getBlankQuestion = (type: TQuestionType): TQuestion => {
    const id = crypto.randomUUID()
    switch (type) {
        case "multipleChoice":
            return getBlankMultipleChoiceQuestion(id)
        case "trueFalse":
            return getBlankTrueFalseQuestion(id)
        case "connectPairs":
            return getBlankConnectPairsQuestion(id)
        case "shortAnswer":
            return getBlankShortAnswerQuestion(id)
    }
}

const getBlankMultipleChoiceAnswer = () => {
    return {
        id: crypto.randomUUID(),
        answerText: "",
        isRight: false,
    }
}

const getBlankMultipleChoiceQuestion = (
    id: TMultipleChoiceQuestion["id"]
): TMultipleChoiceQuestion => {
    return {
        id,
        type: "multipleChoice",
        questionText: "",
        answerArr: [
            getBlankMultipleChoiceAnswer(),
            getBlankMultipleChoiceAnswer()
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

const getBlankConnectPairsQuestion = (
    id: TConnectPairsQuestion["id"]
): TConnectPairsQuestion => {
    return {
        id,
        type: "connectPairs",
        questionText: "",
        pairArr: [],
    }
}

const getBlankShortAnswerQuestion = (
    id: TShortAnswerQuestion["id"]
): TShortAnswerQuestion => {
    return {
        id,
        type: "shortAnswer",
        questionText: "",
        correctAnswerArr: [],
    }
}

export {
    getBlankConnectPairsQuestion,
    getBlankMultipleChoiceQuestion,
    getBlankQuestion,
    getBlankShortAnswerQuestion,
    getBlankTrueFalseQuestion,
    getBlankMultipleChoiceAnswer
}
