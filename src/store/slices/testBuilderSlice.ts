import type { TQuestionType } from "@/features/TestConstructor/model/types"
import {
    getBlankQuestion,
    getDefaultDraft
} from "@/features/TestConstructor/model/utils/blankTestFactories"
import type { StateCreator } from "zustand"
import type { RootStore, TestTestConstructorSlice } from "../types"
import { reorderQuestionArr } from "@/features/TestConstructor/model/utils/updateTest"

export const createTestBuilderSlice: StateCreator<
    RootStore,
    [["zustand/immer", never]],
    [],
    TestTestConstructorSlice
> = (set) => ({
    draft: getDefaultDraft(),

    updateQuestion: (id, update) => {
        set((state) => ({
            draft: {
                ...state.draft,
                questionArr: state.draft.questionArr.map(question => question.id === id
                    ? { ...question, ...update }
                    : question)
            }
        }))
    },

    updateQuestionFn: (questionId, update) => {
        set((state) => ({
            draft: {
                ...state.draft,
                questionArr: state.draft.questionArr.map(question => question.id === questionId ? update(question) : question)
            }
        }))
    },

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

    reorderQuestions: (sourceIndex, targetIndex) =>
        set((state) => ({
            draft: {
                ...state.draft,
                questionArr: reorderQuestionArr(state.draft.questionArr, sourceIndex, targetIndex),
            },
        })),

    resetDraft: () =>
        set({
            draft: getDefaultDraft(),
        }),
})
