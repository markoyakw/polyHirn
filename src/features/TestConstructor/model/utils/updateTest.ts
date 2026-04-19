import { TQuestion } from "../types"

const reorderQuestionArr = (
    questionArr: TQuestion[],
    sourceIndex: number,
    targetIndex: number
) => {
    if (sourceIndex === targetIndex) {
        return questionArr
    }

    const nextQuestionArr = [...questionArr]
    const [movedQuestion] = nextQuestionArr.splice(sourceIndex, 1)

    if (movedQuestion === undefined) {
        return questionArr
    }

    nextQuestionArr.splice(targetIndex, 0, movedQuestion)
    return nextQuestionArr
}

export { reorderQuestionArr }
