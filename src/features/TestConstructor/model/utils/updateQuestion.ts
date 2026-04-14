import { TMultipleChoiceQuestion } from "../types";
import { getBlankMultipleChoiceAnswer } from "./blankQuestion";
import type { TMultipleChoiceAnswer, TQuestion } from "../types"

const addMultipleChoiceAnswer = (question: TMultipleChoiceQuestion): TMultipleChoiceQuestion => {
    return { ...question, answerArr: [...question.answerArr, getBlankMultipleChoiceAnswer()] }
}

const updateMultipleChoiceAnswer = (answerId: TMultipleChoiceAnswer["id"], newAnswer: TMultipleChoiceAnswer) =>
    (question: TMultipleChoiceQuestion): TMultipleChoiceQuestion => {
        return {
            ...question,
            answerArr: question.answerArr.map((answer) =>
                answer.id === answerId ? newAnswer : answer
            ),
        }
    }

export {
    addMultipleChoiceAnswer,
    updateMultipleChoiceAnswer
}