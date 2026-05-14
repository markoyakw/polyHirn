import { useEffect, useLayoutEffect, useRef, useState, type FC, type PointerEvent } from "react"
import type { TFillGapsGap, TFillGapsGapResizeSide } from "./utils"
import { BiSolidLeftArrow } from "react-icons/bi"
import classes from "./FillGapsQuestion.module.css"
import clsx from "clsx"

type TFillGapsGapProps = {
    gap: TFillGapsGap
    onResizeStart: (
        gapId: TFillGapsGap["id"],
        side: TFillGapsGapResizeSide,
        event: PointerEvent
    ) => void
}

const FillGapsGap: FC<TFillGapsGapProps> = ({
    gap,
    onResizeStart,
}) => {

    const handleResizeStart = (
        side: TFillGapsGapResizeSide,
        event: PointerEvent
    ) => {
        setIsResizing(true)
        onResizeStart(gap.id, side, event)
    }

    const [isResizing, setIsResizing] = useState(false)
    const gapRef = useRef<HTMLSpanElement | null>(null)

    useEffect(() => {
        //resizing state to hide resize handles on gap size change
        const handlePointerUp = () => {
            setIsResizing(false)
        }
        window.addEventListener("pointerup", handlePointerUp)
        return () => window.removeEventListener("pointerup", handlePointerUp)
    }, [])

    useLayoutEffect(() => {
        //calculating last row right for right resize handle positioning
        const gap = gapRef.current
        if (!gap) return
        const rects = gap.getClientRects()
        const lastRowRect = rects[rects.length - 1]
        const firstRowRect = rects[0]
        const firstRowRelativeLeft = firstRowRect.left - lastRowRect.left
        const { width: lastRowWidth } = lastRowRect
        gap.style.setProperty("--last-row-right", lastRowWidth - firstRowRelativeLeft + "px")
    }, [gap])

    const gapClassName = clsx(classes["gap"], isResizing && classes["gap--resizing"])

    return (
        <span
            ref={gapRef}
            className={gapClassName}
            data-gap-id={gap.id}
            data-gap-start={gap.start}
            data-gap-end={gap.end}
        >
            <span
                className={classes["gap__size-handle"]}
                onPointerDown={(event) => handleResizeStart("start", event)}
            >
                <BiSolidLeftArrow />
            </span>
            {gap.value}
            <span
                className={classes["gap__size-handle"]}
                onPointerDown={(event) => handleResizeStart("end", event)}
            >
                <BiSolidLeftArrow />
            </span>
        </span>
    )
}

export default FillGapsGap
