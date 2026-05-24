import { useEffect, useLayoutEffect, useRef, type FC, type PointerEvent } from "react"
import type { TFillGapsGap, TFillGapsGapResizeSide } from "./utils"
import { BiSolidLeftArrow } from "react-icons/bi"
import classes from "./FillGapsQuestion.module.css"
import { SlOptions } from "react-icons/sl"
import clsx from "clsx"
import { RiDeleteBin5Line } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"
import { LuSave } from "react-icons/lu"
import { motion } from "motion/react"

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
    }, [])

    useLayoutEffect(function calculateRightResizeHandlePosition() {
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

    const onGapEditingStart = () => {
        onEditingStart(gap.id)
    }

    const onGapEditingEnd = () => {
        onEditingEnd()
    }

    return (
        <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1 }}
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
                    classes["gap__options-toggle-trigger"],
                    classes["gap__controls"]
                )}
            >
                <div className={classes["gap__options"]}>
                    <div className={clsx(classes["gap__options-group"], gap.isEditing && classes["gap__options-group--visible"])}>
                        <button onClick={onGapEditingEnd}>
                            <LuSave />finish editing
                        </button>
                    </div>
                    <div className={clsx(classes["gap__options-group"], !gap.isEditing && classes["gap__options-group--visible"])}>
                        <button onClick={onGapEditingStart}>
                            <AiOutlineEdit />edit
                        </button>
                        <span className={classes["gap__options-divider"]} />
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
        </motion.span>
    )
}

export default FillGapsGap
