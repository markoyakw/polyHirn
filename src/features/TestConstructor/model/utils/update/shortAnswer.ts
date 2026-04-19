import getWrongQuestionTypeError from "@/utils/getWrongQuestionTypeError"
import type {
    TQuestion,
    TShortAnswerAcceptedAnswer,
    TShortAnswerQuestion,
} from "../../types"
import { getBlankShortAnswer } from "../blankTestFactories"

const MINIMUM_SHORT_ANSWER_COUNT = 1

const addShortAnswer = () => (question: TQuestion): TShortAnswerQuestion => {
    if (question.type !== "shortAnswer") {
        throw new Error(getWrongQuestionTypeError(question.type, "shortAnswer"))
    }

    return {
        ...question,
        correctAnswerArr: [...question.correctAnswerArr, getBlankShortAnswer()],
    }
}

const updateShortAnswer = (
    answerId: TShortAnswerAcceptedAnswer["id"],
    newValue: string
) =>
    (question: TQuestion): TShortAnswerQuestion => {
        if (question.type !== "shortAnswer") {
            throw new Error(getWrongQuestionTypeError(question.type, "shortAnswer"))
        }

        return {
            ...question,
            correctAnswerArr: question.correctAnswerArr.map((answer) =>
                answer.id === answerId ? { ...answer, answerText: newValue } : answer
            ),
        }
    }

const removeShortAnswer = (answerId: TShortAnswerAcceptedAnswer["id"]) =>
    (question: TQuestion): TShortAnswerQuestion => {
        if (question.type !== "shortAnswer") {
            throw new Error(getWrongQuestionTypeError(question.type, "shortAnswer"))
        }

        if (question.correctAnswerArr.length <= MINIMUM_SHORT_ANSWER_COUNT) {
            return question
        }

        return {
            ...question,
            correctAnswerArr: question.correctAnswerArr.filter((answer) => answer.id !== answerId),
        }
    }

export {
    addShortAnswer,
    MINIMUM_SHORT_ANSWER_COUNT,
    removeShortAnswer,
    updateShortAnswer,
}
