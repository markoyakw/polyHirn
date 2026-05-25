import type {
    TFillGapsFillItem,
    TFillGapsItem,
    TFillGapsQuestion,
    TQuestion,
} from "@/types/test"
import getWrongQuestionTypeError from "@/utils/getWrongQuestionTypeError"

type TFillGapsRange = {
    id: string
    start: number
    end: number
}

type TSetFillGapsContentParams = {
    text: string
    gapArr: TFillGapsRange[]
}

const getFillGapsFillValue = (item: TFillGapsFillItem) => {
    return item.correctAnswerArr[0]?.answer ?? ""
}

const getFillGapsText = (question: TFillGapsQuestion) => {
    return question.items
        .map((item) => item.type === "text" ? item.text : getFillGapsFillValue(item))
        .join("")
}

const getFillGapsRangeArr = (question: TFillGapsQuestion): TFillGapsRange[] => {
    let cursor = 0
    const gapArr: TFillGapsRange[] = []

    question.items.forEach((item) => {
        if (item.type === "text") {
            cursor += item.text.length
            return
        }

        const value = getFillGapsFillValue(item)
        gapArr.push({
            id: item.id,
            start: cursor,
            end: cursor + value.length,
        })
        cursor += value.length
    })

    return gapArr
}

const getFillGapsItemsFromTextAndGaps = ({
    gapArr,
    text,
}: TSetFillGapsContentParams): TFillGapsItem[] => {
    const sortedGapArr = [...gapArr].sort((a, b) => a.start - b.start)
    const itemArr: TFillGapsItem[] = []
    let cursor = 0

    sortedGapArr.forEach((gap) => {
        itemArr.push({
            id: crypto.randomUUID(),
            type: "text",
            text: text.slice(cursor, gap.start),
        })
        itemArr.push({
            id: gap.id,
            type: "fill",
            correctAnswerArr: [
                {
                    id: crypto.randomUUID(),
                    answer: text.slice(gap.start, gap.end),
                },
            ],
        })
        cursor = gap.end
    })

    itemArr.push({
        id: crypto.randomUUID(),
        type: "text",
        text: text.slice(cursor),
    })

    return itemArr
}

const setFillGapsContent = (params: TSetFillGapsContentParams) =>
    (question: TQuestion): TFillGapsQuestion => {
        if (question.type !== "fillGaps") {
            throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
        }

        return {
            ...question,
            items: getFillGapsItemsFromTextAndGaps(params),
        }
    }

export {
    getFillGapsFillValue,
    getFillGapsItemsFromTextAndGaps,
    getFillGapsRangeArr,
    getFillGapsText,
    setFillGapsContent,
}
export type { TFillGapsRange, TSetFillGapsContentParams }
