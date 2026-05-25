import { detectChange } from "@/utils/changeDetector"
import { useStore } from "@/store"
import type { TFillGapsQuestion } from "@/types/test"
import {
    getFillGapsRangeArr,
    getFillGapsText,
    setFillGapsContent,
} from "@/features/TestConstructor/model/utils/update"
import { type ChangeEvent, type PointerEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
    TEMP_HIGHLIGHTED_GAP_ID,
    getFillGapsGap,
    getGapWithTextChange,
    getGlobalOffsetFromPoint,
    getOverlappingExistingGap,
    getResizedGap,
    type TFillGapsGap,
    type TFillGapsGapResizeSide,
    type TFillGapsGapResizeState,
} from "./utils"

const useFillGapsQuestion = (question: TFillGapsQuestion) => {
    const updateQuestionFn = useStore((state) => state.updateQuestionFn)

    // ====== refs ======
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const gapElementMapRef = useRef<Record<string, HTMLSpanElement | null>>({})
    const caretPositionBeforeGapEditingRef = useRef<number | null>(null)
    const selectPositionRef = useRef<{ start: number, end: number }>({ start: 0, end: 0 })

    // ====== store-derived state ======
    const textareaValue = useMemo(() => getFillGapsText(question), [question])
    const storedGapArr = useMemo(() => getFillGapsRangeArr(question), [question])

    // ====== local ui state ======
    const [editingGapId, setEditingGapId] = useState<TFillGapsGap["id"] | null>(null)
    const [highlightedGap, setHighlightedGap] = useState<TFillGapsGap>(
        getFillGapsGap({
            text: textareaValue,
            start: 0,
            end: 0,
            id: TEMP_HIGHLIGHTED_GAP_ID,
        })
    )
    const [isHighlighting, setIsHighlighting] = useState(false)
    const [resizeState, setResizeState] = useState<TFillGapsGapResizeState | null>(null)

    const gapArr = useMemo<TFillGapsGap[]>(
        () => storedGapArr.map((gap) =>
            getFillGapsGap({
                text: textareaValue,
                start: gap.start,
                end: gap.end,
                id: gap.id,
                isEditing: gap.id === editingGapId,
            })
        ),
        [editingGapId, storedGapArr, textareaValue]
    )

    const commitGaps = useCallback((text: string, nextGapArr: Pick<TFillGapsGap, "id" | "start" | "end">[]) => {
        updateQuestionFn(question.id, setFillGapsContent({
            text,
            gapArr: nextGapArr,
        }))
    }, [question.id, updateQuestionFn])

    // ====== gap refs ======
    const setGapElementRef = useCallback((id: string, element: HTMLSpanElement | null) => {
        gapElementMapRef.current[id] = element
    }, [])

    // ====== gaps ======
    const handleInsertGap = (gap: TFillGapsGap) => {
        if (!gap.value.trim()) return

        commitGaps(textareaValue, [
            ...gapArr,
            getFillGapsGap({
                text: textareaValue,
                start: gap.start,
                end: gap.end,
            }),
        ])
        setHighlightedGap(getFillGapsGap({
            text: textareaValue,
            start: 0,
            end: 0,
            id: TEMP_HIGHLIGHTED_GAP_ID,
        }))
    }

    const deleteGap = (gapId: string) => {
        commitGaps(textareaValue, gapArr.filter((gap) => gap.id !== gapId))
    }

    // ====== gap editing ======
    const restoreCaretPositionToBeforeGapEditing = useCallback(() => {
        const textarea = textareaRef.current
        const caretPosition = caretPositionBeforeGapEditingRef.current

        if (!textarea || caretPosition == null) return

        textarea.focus()
        textarea.setSelectionRange(caretPosition, caretPosition)
        caretPositionBeforeGapEditingRef.current = null
    }, [])

    const finishGapEditing = useCallback(() => {
        setEditingGapId(null)
        restoreCaretPositionToBeforeGapEditing()
    }, [restoreCaretPositionToBeforeGapEditing])

    const startGapEditing = useCallback((gapId: TFillGapsGap["id"]) => {
        const textarea = textareaRef.current
        const gapToEdit = gapArr.find((gap) => gap.id === gapId)

        if (!textarea || !gapToEdit) return

        if (caretPositionBeforeGapEditingRef.current == null) {
            caretPositionBeforeGapEditingRef.current = textarea.selectionStart
        }

        setEditingGapId(gapId)
        textarea.focus()
        textarea.setSelectionRange(gapToEdit.start, gapToEdit.start)
    }, [gapArr])

    useEffect(function endGapEditingOnTextareaClickOutsideGapRects() {
        if (!editingGapId) return

        const handleDocumentClick = (event: MouseEvent) => {
            const editingGapElement = gapElementMapRef.current[editingGapId]
            if (!editingGapElement) return

            const getIsClickInGapRect = (gapRect: DOMRect) =>
                event.clientX >= gapRect.left &&
                event.clientX <= gapRect.right &&
                event.clientY >= gapRect.top &&
                event.clientY <= gapRect.bottom

            const isClickOnEditingGapRect = [...editingGapElement.getClientRects()]
                .some((rect) => getIsClickInGapRect(rect))
            if (isClickOnEditingGapRect) return

            finishGapEditing()
        }

        document.addEventListener("click", handleDocumentClick)
        return () => document.removeEventListener("click", handleDocumentClick)
    }, [editingGapId, finishGapEditing])

    // ====== text highlighting ======
    const handleHighlightEnd = () => {
        setIsHighlighting(false)
    }

    useEffect(function handleKeyboardHighlightEnd() {
        const onShiftKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Shift") {
                handleHighlightEnd()
            }
        }
        document.addEventListener("keyup", onShiftKeyUp)
        return () => document.removeEventListener("keyup", onShiftKeyUp)
    }, [])

    useEffect(function highlightHandler() {
        const textarea = textareaRef.current
        if (!textarea) return

        const handleSelectionChange = () => {
            if (document.activeElement !== textarea) return

            if (selectPositionRef.current) {
                selectPositionRef.current.start = textarea.selectionStart
                selectPositionRef.current.end = textarea.selectionEnd
            }

            setIsHighlighting(true)

            const highlightGap = getFillGapsGap({
                text: textarea.value,
                start: textarea.selectionStart,
                end: textarea.selectionEnd,
                id: TEMP_HIGHLIGHTED_GAP_ID,
            })

            const overlappingGaps = gapArr.filter(existingGap =>
                existingGap.end > highlightGap.start && existingGap.start < highlightGap.end
            )

            for (const overlappingGap of overlappingGaps) {
                const highlightStartsInside = highlightGap.start >= overlappingGap.start && highlightGap.start < overlappingGap.end
                const highlightEndsInside = highlightGap.end > overlappingGap.start && highlightGap.end <= overlappingGap.end

                if (highlightStartsInside) {
                    highlightGap.start = overlappingGap.end
                } else if (highlightEndsInside) {
                    highlightGap.end = overlappingGap.start
                } else if (highlightGap.start < overlappingGap.start && highlightGap.end > overlappingGap.end) {
                    const leftSize = overlappingGap.start - highlightGap.start
                    const rightSize = highlightGap.end - overlappingGap.end
                    if (leftSize >= rightSize) {
                        highlightGap.end = overlappingGap.start
                    } else {
                        highlightGap.start = overlappingGap.end
                    }
                }
            }

            highlightGap.value = textareaValue.slice(highlightGap.start, highlightGap.end)
            setHighlightedGap(highlightGap)
        }

        document.addEventListener("selectionchange", handleSelectionChange)
        return () => {
            document.removeEventListener("selectionchange", handleSelectionChange)
        }
    }, [gapArr, textareaValue])

    // ====== textarea changes ======
    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const nextValue = event.target.value
        const change = detectChange({
            oldText: textareaValue,
            newText: nextValue,
            selectStart: selectPositionRef.current.start,
            selectEnd: selectPositionRef.current.end,
        })
        const nextGapArr = gapArr
            .map((gap) => getGapWithTextChange(gap, change, nextValue))
            .filter((gap): gap is TFillGapsGap => gap != null)

        commitGaps(nextValue, nextGapArr)
    }

    // ====== gap resize ======
    useEffect(function gapResizingHandler() {
        if (!resizeState) return

        const handlePointerMove = (event: globalThis.PointerEvent) => {
            const globalOffset = getGlobalOffsetFromPoint(event.clientX, event.clientY)
            if (globalOffset == null) return

            const oldGap = gapArr.find(gap => gap.id === resizeState.gapId)
            if (!oldGap) return

            const newGap = getResizedGap(oldGap, resizeState.side, globalOffset, textareaValue)

            if (resizeState.side === "end" && oldGap.end === newGap.end) return
            if (resizeState.side === "start" && oldGap.start === newGap.start) return

            const gapAndHighlightArr = [...gapArr, highlightedGap]
            const overlappingExistingGap = getOverlappingExistingGap(newGap, gapAndHighlightArr)
            if (overlappingExistingGap) return

            commitGaps(
                textareaValue,
                gapArr.map((gap) =>
                    gap.id === newGap.id
                        ? newGap
                        : gap
                )
            )
        }

        const handlePointerUp = () => {
            setResizeState(null)
        }

        document.addEventListener("pointermove", handlePointerMove)
        document.addEventListener("pointerup", handlePointerUp)

        return () => {
            document.removeEventListener("pointermove", handlePointerMove)
            document.removeEventListener("pointerup", handlePointerUp)
        }

    }, [commitGaps, textareaValue, gapArr, resizeState, highlightedGap])

    const handleGapResizeStart = (
        gapId: TFillGapsGap["id"],
        side: TFillGapsGapResizeSide,
        event: PointerEvent
    ) => {
        event.preventDefault()
        event.stopPropagation()
        setResizeState({ gapId, side })
    }

    return {
        gapArr,
        handleGapResizeStart,
        handleInsertGap,
        handleTextareaChange,
        highlightedGap,
        textareaRef,
        textareaValue,
        resizeState,
        isHighlighting,
        handleHighlightEnd,
        deleteGap,
        finishGapEditing,
        setGapElementRef,
        startGapEditing,
    }
}

export { useFillGapsQuestion }
