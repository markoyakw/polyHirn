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

        const sourceItem = question.answerArr[sourceIndex]
        const targetItem = question.answerArr[targetIndex]

        if (sourceItem == null || targetItem == null) {
            throw new Error(
                "Could not reorder multiple choice answers: " +
                "sourceItem = " + String(sourceItem?.id) + ", " +
                "targetItem = " + String(targetItem?.id) + ", " +
                "sourceIndex = " + String(sourceIndex) + ", " +
                "targetIndex = " + String(targetIndex)
            )
        }

        const nextAnswersArr = [...question.answerArr]
        const [removedItem] = nextAnswersArr.splice(sourceIndex, 1)

        if (removedItem == null) {
            return question
        }

        nextAnswersArr.splice(targetIndex, 0, removedItem)

        return { ...question, answerArr: nextAnswersArr }
    }

export {
    MINIMUM_MULTIPLE_CHOICE_ANSWER_COUNT,
    addMultipleChoiceAnswer,
    deleteMultipleChoiceAnswer,
    reorderMultipleChoiceAnswers,
    updateMultipleChoiceAnswer,
}
