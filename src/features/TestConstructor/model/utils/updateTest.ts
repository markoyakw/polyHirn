import { TQuestion } from "../types"

const reorderQuestionArr = (questionArr: TQuestion[], from: number, to: number) => {
    if (
        from < 0 ||
        to < 0 ||
        from >= questionArr.length ||
        to >= questionArr.length ||
        from === to
    ) {
        return questionArr
    }

    const nextQuestionArr = [...questionArr]
    const [movedQuestion] = nextQuestionArr.splice(from, 1)

    if (movedQuestion === undefined) {
        return questionArr
    }

    nextQuestionArr.splice(to, 0, movedQuestion)
    return nextQuestionArr
}

export { reorderQuestionArr }