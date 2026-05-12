import getWrongQuestionTypeError from "@/utils/getWrongQuestionTypeError"
import type { TQuestion, TTrueFalseQuestion } from "@/types/test"

const updateTrueFalseAnswer = (newValue: TTrueFalseQuestion["answer"]) =>
    (question: TQuestion): TTrueFalseQuestion => {
        if (question.type !== "trueFalse") {
            throw new Error(getWrongQuestionTypeError(question.type, "trueFalse"))
        }

        return {
            ...question,
            answer: newValue,
        }
    }

export { updateTrueFalseAnswer }
