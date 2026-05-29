import type { TTest } from "@/types/test"

type TStudentMultipleChoiceAnswer = {
    questionId: string
    type: "multipleChoice"
    selectedAnswerIds: string[]
}

type TStudentTrueFalseAnswer = {
    questionId: string
    type: "trueFalse"
    answer: boolean | null
}

type TStudentMatchPairsAnswer = {
    questionId: string
    type: "matchPairs"
    pairedItemIds: Record<string, string> // leftItemId → rightItemId
}

type TStudentShortAnswer = {
    questionId: string
    type: "shortAnswer"
    answerText: string
}

type TStudentAnswer =
    | TStudentMultipleChoiceAnswer
    | TStudentTrueFalseAnswer
    | TStudentMatchPairsAnswer
    | TStudentShortAnswer

type TStudentAnswers = Record<string, TStudentAnswer>

const initializeStudentAnswers = (test: TTest): TStudentAnswers => {
    const studentAnswers: TStudentAnswers = {}
    for (const question of test.questionArr) {
        switch (question.type) {
            case "multipleChoice":
                studentAnswers[question.id] = { questionId: question.id, type: "multipleChoice", selectedAnswerIds: [] }
                break
            case "trueFalse":
                studentAnswers[question.id] = { questionId: question.id, type: "trueFalse", answer: null }
                break
            case "matchPairs":
                studentAnswers[question.id] = { questionId: question.id, type: "matchPairs", pairedItemIds: {} }
                break
            case "shortAnswer":
                studentAnswers[question.id] = { questionId: question.id, type: "shortAnswer", answerText: "" }
                break
            case "fillGaps":
                break
        }
    }
    return studentAnswers
}

export type {
    TStudentAnswer,
    TStudentAnswers,
    TStudentMatchPairsAnswer,
    TStudentMultipleChoiceAnswer,
    TStudentShortAnswer,
    TStudentTrueFalseAnswer,
}
export { initializeStudentAnswers }
