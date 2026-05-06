import { detectChange } from "@/lib/changeDetector"
import { type ChangeEvent, type PointerEvent, useEffect, useRef, useState } from "react"
import {
    TEMP_HIGHLIGHTED_GAP_ID,
    getFillGapsGap,
    getGapWithTextChange,
    getGlobalOffsetFromPoint,
    getResizedGap,
    type TFillGapsGap,
    type TFillGapsGapResizeSide,
    type TFillGapsGapResizeState,
} from "./utils"

const DUMMY_TEXT = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`

const useFillGapsQuestion = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const [textareaValue, setTextareaValue] = useState(DUMMY_TEXT)
    const [highlightedGap, setHighlightedGap] = useState<TFillGapsGap>(
        getFillGapsGap(DUMMY_TEXT, 0, 0, TEMP_HIGHLIGHTED_GAP_ID)
    )
    const [gapArr, setGapArr] = useState<TFillGapsGap[]>([])
    const [resizeState, setResizeState] = useState<TFillGapsGapResizeState | null>(null)

    const handleInsertGap = (gap: TFillGapsGap) => {
        if (!gap.value.trim()) return

        setGapArr((oldGapArr) => [
            ...oldGapArr,
            getFillGapsGap(textareaValue, gap.start, gap.end),
        ])
        setHighlightedGap(getFillGapsGap(textareaValue, 0, 0, TEMP_HIGHLIGHTED_GAP_ID))
    }

    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        const handleSelectionChange = () => {
            if (document.activeElement !== textarea) return

            setHighlightedGap(
                getFillGapsGap(
                    textarea.value,
                    textarea.selectionStart,
                    textarea.selectionEnd,
                    TEMP_HIGHLIGHTED_GAP_ID
                )
            )
        }

        document.addEventListener("selectionchange", handleSelectionChange)

        return () => {
            document.removeEventListener("selectionchange", handleSelectionChange)
        }
    }, [])

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const nextValue = event.target.value
        const change = detectChange(textareaValue, nextValue)

        setGapArr((oldGapArr) =>
            oldGapArr
                .map((gap) => getGapWithTextChange(gap, change, nextValue))
                .filter((gap): gap is TFillGapsGap => gap != null)
        )
        setTextareaValue(nextValue)
    }

    useEffect(() => {
        if (!resizeState) return

        const handlePointerMove = (event: globalThis.PointerEvent) => {
            const globalOffset = getGlobalOffsetFromPoint(event.clientX, event.clientY)
            if (globalOffset == null) return

            setGapArr((oldGapArr) =>
                oldGapArr.map((gap) =>
                    gap.id === resizeState.gapId
                        ? getResizedGap(gap, resizeState.side, globalOffset, textareaValue)
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
    }, [resizeState, textareaValue])

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
    }
}

export { useFillGapsQuestion }
