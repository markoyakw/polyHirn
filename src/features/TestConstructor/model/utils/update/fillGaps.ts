import getWrongQuestionTypeError from "@/utils/getWrongQuestionTypeError"
import type {
    TFillGapsFillItem,
    TFillGapsItem,
    TFillGapsQuestion,
    TQuestion,
} from "../../types"
import {
    getBlankFillGapsAcceptedAnswer,
    getBlankFillGapsFillItem,
    getBlankFillGapsTextItem,
} from "../blankTestFactories"

const MINIMUM_FILL_GAPS_FILL_ITEM_COUNT = 1
const MINIMUM_FILL_GAPS_TEXT_ITEM_COUNT = 1
const MINIMUM_FILL_GAPS_ACCEPTED_ANSWER_COUNT = 1

const addFillGapsItem = (type: TFillGapsItem["type"]) =>
    (question: TQuestion): TFillGapsQuestion => {
        if (question.type !== "fillGaps") {
            throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
        }

        const newItem = type === "text"
            ? getBlankFillGapsTextItem()
            : getBlankFillGapsFillItem()

        return {
            ...question,
            items: [...question.items, newItem],
        }
    }

const updateFillGapsTextItem = (
    itemId: TFillGapsItem["id"],
    newValue: string
) =>
    (question: TQuestion): TFillGapsQuestion => {
        if (question.type !== "fillGaps") {
            throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
        }

        return {
            ...question,
            items: question.items.map((item) =>
                item.id === itemId && item.type === "text"
                    ? { ...item, text: newValue }
                    : item
            ),
        }
    }

const updateFillGapsAnswer = (
    itemId: TFillGapsFillItem["id"],
    answerId: TFillGapsFillItem["correctAnswerArr"][number]["id"],
    newValue: string
) =>
    (question: TQuestion): TFillGapsQuestion => {
        if (question.type !== "fillGaps") {
            throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
        }

        return {
            ...question,
            items: question.items.map((item) => {
                if (item.id !== itemId || item.type !== "fill") {
                    return item
                }

                return {
                    ...item,
                    correctAnswerArr: item.correctAnswerArr.map((answer) =>
                        answer.id === answerId
                            ? { ...answer, answer: newValue }
                            : answer
                    ),
                }
            }),
        }
    }

const addFillGapsAcceptedAnswer = (itemId: TFillGapsFillItem["id"]) =>
    (question: TQuestion): TFillGapsQuestion => {
        if (question.type !== "fillGaps") {
            throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
        }

        return {
            ...question,
            items: question.items.map((item) => {
                if (item.id !== itemId || item.type !== "fill") {
                    return item
                }

                return {
                    ...item,
                    correctAnswerArr: [
                        ...item.correctAnswerArr,
                        getBlankFillGapsAcceptedAnswer(),
                    ],
                }
            }),
        }
    }

const deleteFillGapsAcceptedAnswer = (
    itemId: TFillGapsFillItem["id"],
    answerId: TFillGapsFillItem["correctAnswerArr"][number]["id"]
) =>
    (question: TQuestion): TFillGapsQuestion => {
        if (question.type !== "fillGaps") {
            throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
        }

        return {
            ...question,
            items: question.items.map((item) => {
                if (item.id !== itemId || item.type !== "fill") {
                    return item
                }

                if (item.correctAnswerArr.length <= MINIMUM_FILL_GAPS_ACCEPTED_ANSWER_COUNT) {
                    return item
                }

                return {
                    ...item,
                    correctAnswerArr: item.correctAnswerArr.filter(
                        (answer) => answer.id !== answerId
                    ),
                }
            }),
        }
    }

const deleteFillGapsItem = (itemId: TFillGapsItem["id"]) =>
    (question: TQuestion): TFillGapsQuestion => {
        if (question.type !== "fillGaps") {
            throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
        }

        const itemToDelete = question.items.find((item) => item.id === itemId)

        if (!itemToDelete || isFillGapsItemDeleteDisabled(question, itemToDelete)) {
            return question
        }

        return {
            ...question,
            items: question.items.filter((item) => item.id !== itemId),
        }
    }

const isFillGapsItemDeleteDisabled = (
    question: TFillGapsQuestion,
    item: TFillGapsItem
) => {
    const itemTypeCount = question.items.filter(({ type }) => type === item.type).length

    return item.type === "text"
        ? itemTypeCount <= MINIMUM_FILL_GAPS_TEXT_ITEM_COUNT
        : itemTypeCount <= MINIMUM_FILL_GAPS_FILL_ITEM_COUNT
}

export {
    MINIMUM_FILL_GAPS_ACCEPTED_ANSWER_COUNT,
    MINIMUM_FILL_GAPS_FILL_ITEM_COUNT,
    MINIMUM_FILL_GAPS_TEXT_ITEM_COUNT,
    addFillGapsAcceptedAnswer,
    addFillGapsItem,
    deleteFillGapsAcceptedAnswer,
    deleteFillGapsItem,
    isFillGapsItemDeleteDisabled,
    updateFillGapsAnswer,
    updateFillGapsTextItem,
}
