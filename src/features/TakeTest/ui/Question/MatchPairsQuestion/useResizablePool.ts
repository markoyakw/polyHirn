import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import type { TMatchPairsAnswer } from "@/types/test"

const GRID_COLUMNS = 20

type THeightState = { value: number | undefined; immediate: boolean }

const useResizablePool = (items: TMatchPairsAnswer[]) => {
    const outerRef = useRef<HTMLDivElement | null>(null)
    const gridRef = useRef<HTMLDivElement | null>(null)
    const measurerRef = useRef<HTMLDivElement | null>(null)

    const [naturalWidths, setNaturalWidths] = useState<Record<string, number>>({})
    const [gridWidth, setGridWidth] = useState(0)
    const [gapPx, setGapPx] = useState(0)
    const [heightState, setHeightState] = useState<THeightState>({ value: undefined, immediate: true })

    // Skip the height tween until after the first paint so the pool mounts at its true size.
    const animationEnabledRef = useRef(false)
    useEffect(() => {
        animationEnabledRef.current = true
    }, [])

    const itemsKey = items.map((item) => item.id).join("|")

    // Measure each item's natural (single-line) width from the hidden measurer.
    useLayoutEffect(() => {
        const measurer = measurerRef.current
        const grid = gridRef.current
        if (!measurer || !grid) return

        const widths: Record<string, number> = {}
        for (const child of Array.from(measurer.children)) {
            const el = child as HTMLElement
            const id = el.dataset.measureId
            if (id) widths[id] = el.offsetWidth
        }
        setNaturalWidths(widths)
        setGapPx(parseFloat(getComputedStyle(grid).columnGap) || 0)
        setGridWidth(grid.clientWidth)
    }, [itemsKey])

    // Keep the available width current so spans stay correct on container resize.
    useLayoutEffect(() => {
        const grid = gridRef.current
        if (!grid) return
        const observer = new ResizeObserver(() => setGridWidth(grid.clientWidth))
        observer.observe(grid)
        return () => observer.disconnect()
    }, [])

    const spans = useMemo(() => {
        const result: Record<string, number> = {}
        if (gridWidth <= 0) return result
        for (const item of items) {
            const width = naturalWidths[item.id]
            if (width == null) {
                result[item.id] = 1
                continue
            }
            // Smallest column count whose tracks (plus their gaps) cover the item's natural width.
            const raw = Math.ceil((GRID_COLUMNS * (width + gapPx)) / (gridWidth + gapPx))
            result[item.id] = Math.min(GRID_COLUMNS, Math.max(1, raw))
        }
        return result
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsKey, naturalWidths, gridWidth, gapPx])

    // Once the new spans/items are in the DOM, measure the pool's natural height and animate to it.
    useLayoutEffect(() => {
        const outer = outerRef.current
        const grid = gridRef.current
        if (!outer || !grid) return

        const style = getComputedStyle(outer)
        const extraY =
            parseFloat(style.paddingTop) +
            parseFloat(style.paddingBottom) +
            parseFloat(style.borderTopWidth) +
            parseFloat(style.borderBottomWidth)
        const minHeight = parseFloat(style.minHeight) || 0
        const target = Math.max(grid.offsetHeight + extraY, minHeight)

        setHeightState((prev) =>
            prev.value === target ? prev : { value: target, immediate: !animationEnabledRef.current }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spans, itemsKey])

    return {
        outerRef,
        gridRef,
        measurerRef,
        spans,
        height: heightState.value,
        isHeightImmediate: heightState.immediate,
    }
}

export { useResizablePool }
