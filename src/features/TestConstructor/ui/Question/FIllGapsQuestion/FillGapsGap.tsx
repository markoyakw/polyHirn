import { useLayoutEffect, useRef, type FC, type PointerEvent } from "react"
import type { TFillGapsGap, TFillGapsGapResizeSide } from "./utils"
import { BiSolidLeftArrow } from "react-icons/bi"
import classes from "./FillGapsQuestion.module.css"
type TFillGapsGapProps = {
    gap: TFillGapsGap
    onResizeStart: (
        gapId: string,
        side: TFillGapsGapResizeSide,
        event: PointerEvent
    ) => void
}

const FillGapsGap: FC<TFillGapsGapProps> = ({
    gap,
    onResizeStart
}) => {
    const gapRef = useRef<HTMLSpanElement | null>(null)

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

    return (
        <span
            ref={gapRef}
            className={classes["gap"]}
            data-gap-id={gap.id}
            data-gap-start={gap.start}
            data-gap-end={gap.end}
        >
            <span
                className={classes["gap__size-handle"]}
                onPointerDown={(event) => onResizeStart(gap.id, "start", event)}
            >
                <BiSolidLeftArrow />
            </span>
            {gap.value}
            <span
                className={classes["gap__size-handle"]}
                onPointerDown={(event) => onResizeStart(gap.id, "end", event)}
            >
                <BiSolidLeftArrow />
            </span>
        </span>
    )
}

export default FillGapsGap
