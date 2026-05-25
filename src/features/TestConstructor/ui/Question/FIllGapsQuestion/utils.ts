import type { TChangeData } from "@/utils/changeDetector"

const TEMP_HIGHLIGHTED_GAP_ID = "tempHighlighted"

type TFillGapsGap = {
    id: string
    isEditing: boolean
    start: number
    end: number
    value: string
    element: HTMLSpanElement | null
}

type TGetFillGapsGapParams = {
    text: string
    start: number
    end: number
    id?: string
    element?: HTMLSpanElement | null
    isEditing?: boolean
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

const getFillGapsGap = ({
    text,
    start,
    end,
    id = cryptoUID(),
    element = null,
    isEditing = false,
}: TGetFillGapsGapParams): TFillGapsGap => {
    return {
        id,
        isEditing,
        start,
        end,
        value: getGapValue(text, start, end),
        element
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

    return getFillGapsGap({
        text,
        start: nextStart,
        end: nextEnd,
        id: gap.id,
        element: gap.element,
        isEditing: gap.isEditing,
    })
}

const getOverlappingExistingGap = (
    newGap: TFillGapsGap,
    gapArr: TFillGapsGap[],
) => {
    return gapArr.find(existingGap => {
        if (newGap.id === existingGap.id) return false
        if (existingGap.end > newGap.start && existingGap.start < newGap.end) {
            if (existingGap.end !== existingGap.start) return true
        }
    })
}

const getGapWithTextChange = (
    gap: TFillGapsGap,
    change: TChangeData,
    nextText: string
): TFillGapsGap | null => {
    const { end, id, start, element, isEditing } = gap
    const charsCountDifference = change.lengthChange

    //if isEditing = true, wile editing text right before or after the gap,
    //text should appear in the gap. When isEditing = false, outside.
    const isEditingNormaliser = isEditing ? 0 : 1

    const createGap = (s: number, e: number) =>
        getFillGapsGap({ text: nextText, start: s, end: e, id, element, isEditing })

    if (!getGapValue(nextText, start, end).trim() || start === end) return null
    if (change.from + isEditingNormaliser > end) return createGap(start, end)
    if (change.to < start + isEditingNormaliser) {
        return createGap(start + charsCountDifference, end + charsCountDifference)
    }

    return createGap(start, end + change.lengthChange)
}

export {
    TEMP_HIGHLIGHTED_GAP_ID,
    getFillGapsGap,
    getGapWithTextChange,
    getGlobalOffsetFromPoint,
    getResizedGap,
    getOverlappingExistingGap
}
export type {
    TFillGapsGap,
    TGetFillGapsGapParams,
    TFillGapsGapResizeSide,
    TFillGapsGapResizeState,
}
