"use client"
import { useStore } from "@/store"
import {
    selectQuestionIds,
    selectReorderQuestions,
} from "@/store/slices/testConstructor.selectors"
import { Stack } from "@/components/ui/Stack/Stack"
import { Header } from "./Header/Header"
import { DragDropProvider, DragEndEvent, DragOverlay } from "@dnd-kit/react"
import { isSortable } from "@dnd-kit/react/sortable"
import QuestionLayout from "./Question/QuestionLayout"
import Portal from "@/components/ui/Portal/Portal"
import { AnimatePresence } from "motion/react"
import dragClasses from "@/globalStyles/drag.module.css"
import { useShallow } from "zustand/react/shallow"

const TestConstructor = () => {
    const questionIds = useStore(useShallow(selectQuestionIds))
    const reorderQuestions = useStore(selectReorderQuestions)

    const handleDragEnd = (e: DragEndEvent) => {
        const { source } = e.operation;
        if (isSortable(source)) {
            const { initialIndex, index } = source
            reorderQuestions(initialIndex, index)
        }
    }

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <Stack gap="m">
                <Header />
                <Stack gap="m">
                    <AnimatePresence>
                        {
                            questionIds.map((questionId, index) =>
                                <QuestionLayout
                                    key={questionId}
                                    questionId={questionId}
                                    index={index}
                                />
                            )
                        }
                    </AnimatePresence>
                </Stack>
            </Stack >

            <Portal>
                <DragOverlay className={dragClasses["drag-overlay"]}>
                    {source => {
                        if (!isSortable(source)) return null

                        return (
                            <QuestionLayout
                                questionId={source.id.toString()}
                                index={source.initialIndex}
                                isDragOverlay
                            />
                        )
                    }}
                </DragOverlay>
            </Portal>

        </DragDropProvider >
    )
}

export default TestConstructor
