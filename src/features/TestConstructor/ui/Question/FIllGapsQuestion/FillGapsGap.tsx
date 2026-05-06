import { useEffect, useState, type FC, type PointerEvent } from "react"
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

    useEffect(() => {
        const handlePointerUp = () => {
            setIsResizing(false)
        }

        window.addEventListener("pointerup", handlePointerUp)
        return () => window.removeEventListener("pointerup", handlePointerUp)
    }, [])

    const gapClassName = clsx(classes["gap"], isResizing && classes["gap--resizing"])

    return (
        <span
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
