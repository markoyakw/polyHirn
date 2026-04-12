import { StateCreator } from "zustand"
import {
    RootStore,
    TConnectPairsQuestion,
    TMultipleChoiceQuestion,
    TQuestion,
    TQuestionUpdates,
    TQuestionType,
    TShortAnswerQuestion,
    TTest,
    TestTestConstructorSlice,
    TTrueFalseQuestion,
} from "../types"

const defaultDraft: TTest = {
    name: "",
    passMark: 50,
    questionArr: [],
}

const getBlankQuestion = (type: TQuestionType, id: string = ""): TQuestion => {
    switch (type) {
        case "multipleChoice":
            return getBlankMultipleChoiceQuestion(id)
        case "trueFalse":
            return getBlankTrueFalseQuestion(id)
        case "connectPairs":
            return getBlankConnectPairsQuestion(id)
        case "shortAnswer":
            return getBlankShortAnswerQuestion(id)
    }
}

const getBlankMultipleChoiceQuestion = (id: TMultipleChoiceQuestion["id"]): TMultipleChoiceQuestion => {
    return {
        id,
        type: "multipleChoice",
        questionText: "",
        answerArr: []
    }
}

const getBlankTrueFalseQuestion = (id: TTrueFalseQuestion["id"]): TTrueFalseQuestion => {
    return {
        id,
        type: "trueFalse",
        questionText: "",
        correctAnswer: null,
    }
}

const getBlankConnectPairsQuestion = (id: TConnectPairsQuestion["id"]): TConnectPairsQuestion => {
    return {
        id,
        type: "connectPairs",
        questionText: "",
        pairArr: [],
    }
}

const getBlankShortAnswerQuestion = (id: TShortAnswerQuestion["id"]): TShortAnswerQuestion => {
    return {
        id,
        type: "shortAnswer",
        questionText: "",
        correctAnswerArr: [],
    }
}

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

export const createTestBuilderSlice: StateCreator<
    RootStore,
    [],
    [],
    TestTestConstructorSlice
> = (set) => ({
    draft: defaultDraft,

    setTitle: (title) =>
        set((state) => ({
            draft: {
                ...state.draft,
                name: title,
            },
        })),

    addQuestion: (questionType: TQuestionType) =>
        set((state) => ({
            draft: {
                ...state.draft,
                questionArr: [...state.draft.questionArr, getBlankQuestion(questionType)],
            },
        })),

    removeQuestion: (id) =>
        set((state) => ({
            draft: {
                ...state.draft,
                questionArr: state.draft.questionArr.filter((question) => question.id !== id),
            },
        })),

    reorderQuestions: (from, to) =>
        set((state) => ({
            draft: {
                ...state.draft,
                questionArr: reorderQuestionArr(state.draft.questionArr, from, to),
            },
        })),

    resetDraft: () =>
        set({
            draft: defaultDraft,
        }),
})
