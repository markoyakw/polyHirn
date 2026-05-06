import type { TChangeData } from "@/lib/changeDetector"

const TEMP_HIGHLIGHTED_GAP_ID = "tempHighlighted"

type TFillGapsGap = {
    id: string
    start: number
    end: number
    value: string
}

type TFillGapsGapResizeSide = "start" | "end"

type TFillGapsGapResizeState = {
    gapId: TFillGapsGap["id"]
    side: TFillGapsGapResizeSide
}

const cryptoUID = () => crypto.randomUUID()

const getGapValue = (text: string, start: number, end: number) => {
    return text.slice(start, end)
}

const getFillGapsGap = (
    text: string,
    start: number,
    end: number,
    id = cryptoUID()
): TFillGapsGap => {
    return {
        id,
        start,
        end,
        value: getGapValue(text, start, end),
    }
}

const getGlobalOffsetFromPoint = (clientX: number, clientY: number) => {
    const pos = document.caretPositionFromPoint(clientX, clientY)
    if (!pos) return null

    const targetNode = pos.offsetNode
    const localOffset = pos.offset
    const targetElement = targetNode instanceof Element
        ? targetNode
        : targetNode.parentElement
    const gapElement = targetElement?.closest<HTMLElement>("[data-gap-id]")
    const gapStart = Number(gapElement?.dataset.gapStart ?? 0)

    return gapElement ? gapStart + localOffset : localOffset
}

const getResizedGap = (
    gap: TFillGapsGap,
    side: TFillGapsGapResizeSide,
    globalOffset: number,
    text: string,
) => {
    const nextStart = side === "start"
        ? Math.min(globalOffset, gap.end - 1)
        : gap.start
    const nextEnd = side === "end"
        ? Math.max(globalOffset, gap.start + 1)
        : gap.end

    return getFillGapsGap(text, nextStart, nextEnd, gap.id)
}

const getGapWithTextChange = (
    gap: TFillGapsGap,
    change: TChangeData,
    nextText: string
): TFillGapsGap | null => {
    const { end, id, start } = gap
    const charsCountDifference = change.lengthChange - (change.to - change.from)
    const shift = change.to - change.from

    if (!getGapValue(nextText, start, end).trim()) return null
    if (start === end) return null

    if (change.from >= end) {
        return getFillGapsGap(nextText, start, end, id)
    }

    if (change.to <= start) {
        if (charsCountDifference > 0) {
            return getFillGapsGap(
                nextText,
                start + charsCountDifference,
                end + charsCountDifference,
                id
            )
        }

        return getFillGapsGap(nextText, start - shift, end - shift, id)
    }

    return getFillGapsGap(nextText, start, end + change.lengthChange, id)
}

export {
    TEMP_HIGHLIGHTED_GAP_ID,
    getFillGapsGap,
    getGapWithTextChange,
    getGlobalOffsetFromPoint,
    getResizedGap,
}
export type {
    TFillGapsGap,
    TFillGapsGapResizeSide,
    TFillGapsGapResizeState,
}
