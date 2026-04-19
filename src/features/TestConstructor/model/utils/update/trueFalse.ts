import getWrongQuestionTypeError from "@/utils/getWrongQuestionTypeError"
import type { TQuestion, TTrueFalseQuestion } from "../../types"

const updateTrueFalseAnswer = (newValue: TTrueFalseQuestion["correctAnswer"]) =>
    (question: TQuestion): TTrueFalseQuestion => {
        if (question.type !== "trueFalse") {
            throw new Error(getWrongQuestionTypeError(question.type, "trueFalse"))
        }

        return {
            ...question,
            correctAnswer: newValue,
        }
    }

export { updateTrueFalseAnswer }
