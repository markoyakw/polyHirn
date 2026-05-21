import { useLayoutEffect, useRef, type FC, type PointerEvent } from "react"
import type { TFillGapsGap, TFillGapsGapResizeSide } from "./utils"
import { BiSolidLeftArrow } from "react-icons/bi"
import classes from "./FillGapsQuestion.module.css"
import { SlOptions } from "react-icons/sl"
import clsx from "clsx"
import { RiDeleteBin5Line } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"

type TFillGapsGapProps = {
    gap: TFillGapsGap
    deleteGap: (gapId: string) => void
    onResizeStart: (
        gapId: string,
        side: TFillGapsGapResizeSide,
        event: PointerEvent
    ) => void
}

const FillGapsGap: FC<TFillGapsGapProps> = ({
    gap,
    onResizeStart,
    deleteGap
}) => {
    const gapRef = useRef<HTMLSpanElement | null>(null)

    useLayoutEffect(() => {
        //calculating last row right for right resize handle positioning
        if (!gapRef.current) return
        const rects = gapRef.current.getClientRects()
        const lastRowRect = rects[rects.length - 1]
        const firstRowRect = rects[0]
        const firstRowRelativeLeft = firstRowRect.left - lastRowRect.left
        const { width: lastRowWidth } = lastRowRect
        gapRef.current.style.setProperty("--last-row-right", lastRowWidth - firstRowRelativeLeft + "px")
    }, [gap])

    //TODO: add an "edit" button and delete, fix the bug when an 0 gap messes with highlight

    const handleGapDelete = () => {
        deleteGap(gap.id)
    }

    return (
        <span
            ref={gapRef}
            className={classes["gap"]}
            data-gap-id={gap.id}
            data-gap-start={gap.start}
            data-gap-end={gap.end}
        >
            <div
                className={clsx(
                    classes["gap__options-toggle-trigger"],
                    classes["gap__controls"]
                )}
            >
                <div className={classes["gap__options"]}>
                    <button>
                        <AiOutlineEdit />edit
                    </button>
                    <span className={classes["gap__options-divider"]} />
                    <button onClick={handleGapDelete}>
                        <RiDeleteBin5Line />delete
                    </button>
                </div>
                <SlOptions />
            </div>
            <span
                className={clsx(
                    classes["gap__size-handle"],
                    classes["gap__controls"]
                )}
                onPointerDown={(event) => onResizeStart(gap.id, "start", event)}
            >
                <BiSolidLeftArrow />
            </span>
            {gap.value}
            <span
                className={clsx(
                    classes["gap__size-handle"],
                    classes["gap__controls"]
                )}
                onPointerDown={(event) => onResizeStart(gap.id, "end", event)}
            >
                <BiSolidLeftArrow />
            </span>
        </span>
    )
}

export default FillGapsGap
