import type {
    TFillGapsFillItem,
    TFillGapsItem,
    TFillGapsQuestion,
} from "../../../model/types"
import { useStore } from "@/store"
import {
    addFillGapsAcceptedAnswer,
    addFillGapsItem,
    deleteFillGapsAcceptedAnswer,
    deleteFillGapsItem,
    updateFillGapsAnswer,
    updateFillGapsTextItem,
} from "@/features/TestConstructor/model/utils/update"

type TFillGapsAnswerId = TFillGapsFillItem["correctAnswerArr"][number]["id"]

const useFillGapsQuestionActions = (questionId: TFillGapsQuestion["id"]) => {
    const updateQuestion = useStore((state) => state.updateQuestion)
    const updateQuestionFn = useStore((state) => state.updateQuestionFn)

    return {
        addAcceptedAnswer: (itemId: TFillGapsFillItem["id"]) => {
            updateQuestionFn(questionId, addFillGapsAcceptedAnswer(itemId))
        },
        addItem: (type: TFillGapsItem["type"]) => {
            updateQuestionFn(questionId, addFillGapsItem(type))
        },
        deleteAcceptedAnswer: (
            itemId: TFillGapsFillItem["id"],
            answerId: TFillGapsAnswerId
        ) => {
            updateQuestionFn(questionId, deleteFillGapsAcceptedAnswer(itemId, answerId))
        },
        deleteItem: (itemId: TFillGapsItem["id"]) => {
            updateQuestionFn(questionId, deleteFillGapsItem(itemId))
        },
        updateAnswer: (
            itemId: TFillGapsFillItem["id"],
            answerId: TFillGapsAnswerId,
            newValue: string
        ) => {
            updateQuestionFn(questionId, updateFillGapsAnswer(itemId, answerId, newValue))
        },
        updateQuestionText: (newValue: string) => {
            updateQuestion(questionId, { questionText: newValue })
        },
        updateTextItem: (itemId: TFillGapsItem["id"], newValue: string) => {
            updateQuestionFn(questionId, updateFillGapsTextItem(itemId, newValue))
        },
    }
}

export { useFillGapsQuestionActions }
export type TFillGapsQuestionActions = ReturnType<typeof useFillGapsQuestionActions>
