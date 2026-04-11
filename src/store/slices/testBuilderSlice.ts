import { StateCreator } from "zustand"
import { RootStore, TQuestion, TTest, TestTestConstructorSlice } from "../types"

const defaultDraft: TTest = {
    name: "",
    passMark: 50,
    questionArr: [],
}

const reorderArray = <T>(items: T[], from: number, to: number) => {
    if (
        from < 0 ||
        to < 0 ||
        from >= items.length ||
        to >= items.length ||
        from === to
    ) {
        return items
    }

    const nextItems = [...items]
    const [movedItem] = nextItems.splice(from, 1)

    if (movedItem === undefined) {
        return items
    }

    nextItems.splice(to, 0, movedItem)
    return nextItems
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

    addQuestion: (question: TQuestion) =>
        set((state) => ({
            draft: {
                ...state.draft,
                questionArr: [...state.draft.questionArr, question],
            },
        })),

    updateQuestion: (id, updates) =>
        set((state) => ({
            draft: {
                ...state.draft,
                questionArr: state.draft.questionArr.map((question) =>
                    question.id === id ? { ...question, ...updates } : question
                ),
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
                questionArr: reorderArray(state.draft.questionArr, from, to),
            },
        })),

    resetDraft: () =>
        set({
            draft: defaultDraft,
        }),
})
