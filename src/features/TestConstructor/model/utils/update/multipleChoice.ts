import getWrongQuestionTypeError from "@/utils/getWrongQuestionTypeError"
import type {
    TMultipleChoiceAnswer,
    TMultipleChoiceQuestion,
    TQuestion,
} from "../../types"
import { getBlankMultipleChoiceAnswer } from "../blankTestFactories"

const MINIMUM_MULTIPLE_CHOICE_ANSWER_COUNT = 2

const addMultipleChoiceAnswer = (question: TMultipleChoiceQuestion): TMultipleChoiceQuestion => {
    return { ...question, answerArr: [...question.answerArr, getBlankMultipleChoiceAnswer()] }
}

const updateMultipleChoiceAnswer = (answerId: TMultipleChoiceAnswer["id"], newAnswer: TMultipleChoiceAnswer) =>
    (question: TQuestion): TMultipleChoiceQuestion => {
        if (question.type !== "multipleChoice") {
            throw new Error(getWrongQuestionTypeError(question.type, "multipleChoice"))
        }

        return {
            ...question,
            answerArr: question.answerArr.map((answer) =>
                answer.id === answerId ? newAnswer : answer
            ),
        }
    }

const deleteMultipleChoiceAnswer = (answerId: TMultipleChoiceAnswer["id"]) =>
    (question: TQuestion): TMultipleChoiceQuestion => {
        if (question.type !== "multipleChoice") {
            throw new Error(getWrongQuestionTypeError(question.type, "multipleChoice"))
        }

        if (question.answerArr.length <= MINIMUM_MULTIPLE_CHOICE_ANSWER_COUNT) {
            return question
        }

        return {
            ...question,
            answerArr: question.answerArr.filter((answer) => answer.id !== answerId),
        }
    }

const reorderMultipleChoiceAnswers = (targetIndex: number, sourceIndex: number) =>
    (question: TQuestion): TMultipleChoiceQuestion => {
        if (question.type !== "multipleChoice") {
            throw new Error(getWrongQuestionTypeError(question.type, "multipleChoice"))
        }

        const targetItem = question.answerArr[targetIndex]
        const sourceItem = question.answerArr[sourceIndex]

        if (targetItem == null || sourceItem == null) {
            throw new Error(
                "Could not reorder multiple choice answers: " +
                "sourceItem = " + String(sourceItem?.id) + ", " +
                "targetItem = " + String(targetItem?.id) + ", " +
                "sourceIndex = " + String(sourceIndex) + ", " +
                "targetIndex = " + String(targetIndex)
            )
        }

        return {
            ...question,
            answerArr: question.answerArr.map((answer, index) => {
                const answerArr = question.answerArr
                if (index < targetIndex && index > sourceIndex) answerArr[index - 1]
                return answer
            }),
        }
    }

export {
    MINIMUM_MULTIPLE_CHOICE_ANSWER_COUNT,
    addMultipleChoiceAnswer,
    deleteMultipleChoiceAnswer,
    reorderMultipleChoiceAnswers,
    updateMultipleChoiceAnswer,
}
