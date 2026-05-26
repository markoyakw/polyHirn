import type {
    TFillGapsGap,
    TFillGapsQuestion,
    TQuestion,
} from "@/types/test"
import getWrongQuestionTypeError from "@/utils/getWrongQuestionTypeError"

type TSetFillGapsContentParams = {
    text: string
    gapArr: TFillGapsGap[]
}

const setFillGapsContent = ({
    gapArr,
    text,
}: TSetFillGapsContentParams) =>
    (question: TQuestion): TFillGapsQuestion => {
        if (question.type !== "fillGaps") {
            throw new Error(getWrongQuestionTypeError(question.type, "fillGaps"))
        }

        return {
            ...question,
            questionText: text,
            gapArr,
        }
    }

export {
    setFillGapsContent,
}
export type { TSetFillGapsContentParams }
