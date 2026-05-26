import { useEffect, useLayoutEffect, useRef, type FC, type PointerEvent } from "react"
import type { TFillGapsGap, TFillGapsGapResizeSide } from "./utils"
import { BiSolidLeftArrow } from "react-icons/bi"
import classes from "./FillGapsQuestion.module.css"
import { SlOptions } from "react-icons/sl"
import clsx from "clsx"
import { RiDeleteBin5Line } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"
import { LuSave } from "react-icons/lu"

type TFillGapsGapProps = {
    gap: TFillGapsGap
    deleteGap: (gapId: string) => void
    onEditingEnd: () => void
    onEditingStart: (gapId: string) => void
    onResizeStart: (
        gapId: string,
        side: TFillGapsGapResizeSide,
        event: PointerEvent
    ) => void
    setGapElementRef: (id: string, element: HTMLSpanElement | null) => void
}

const FillGapsGap: FC<TFillGapsGapProps> = ({
    gap,
    onEditingEnd,
    onEditingStart,
    onResizeStart,
    deleteGap,
    setGapElementRef,
}) => {

    const gapRef = useRef<HTMLSpanElement | null>(null)

    const setGapRef = (element: HTMLSpanElement | null) => {
        gapRef.current = element
        setGapElementRef(gap.id, element)
    }

    useEffect(() => {
        return () => setGapElementRef(gap.id, null)
    }, [gap.id, setGapElementRef])

    useLayoutEffect(function calculateRightResizeHandlePosition() {
        if (!gapRef.current) return
        const rects = gapRef.current.getClientRects()
        const lastRowRect = rects[rects.length - 1]
        const firstRowRect = rects[0]
        const firstRowRelativeLeft = firstRowRect.left - lastRowRect.left
        const { width: lastRowWidth } = lastRowRect
        gapRef.current.style.setProperty("--last-row-right", lastRowWidth - firstRowRelativeLeft + "px")
    }, [gap])

    const handleGapDelete = () => {
        deleteGap(gap.id)
    }

    const onGapEditingStart = () => {
        onEditingStart(gap.id)
    }

    const onGapEditingEnd = () => {
        onEditingEnd()
    }

    return (
        <span
            ref={setGapRef}
            className={clsx(
                classes["gap"],
                gap.isEditing && classes["gap--is-editing"])
            }
            data-gap-id={gap.id}
            data-gap-start={gap.start}
            data-gap-end={gap.end}
            data-question-element-type={"fill-gaps-gap"}
        >
            <div
                className={clsx(
                    classes["gap__action-menu-toggle-trigger"],
                    classes["gap__controls"]
                )}
            >
                <div className={classes["gap__action-menu"]}>
                    <div className={clsx(classes["gap__action-menu-group"], gap.isEditing && classes["gap__action-menu-group--visible"])}>
                        <button onClick={onGapEditingEnd}>
                            <LuSave />finish editing
                        </button>
                    </div>
                    <div className={clsx(classes["gap__action-menu-group"], !gap.isEditing && classes["gap__action-menu-group--visible"])}>
                        <button onClick={onGapEditingStart}>
                            <AiOutlineEdit />edit
                        </button>
                        <span className={classes["gap__action-menu-divider"]} />
                        <button onClick={handleGapDelete}>
                            <RiDeleteBin5Line />delete
                        </button>
                    </div>
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
