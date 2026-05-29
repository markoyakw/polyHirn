"use client"
import { useCallback, type FC } from "react"
import type { TMatchPairsAnswer } from "@/types/test"
import { useDroppable } from "@dnd-kit/react"
import clsx from "clsx"
import classes from "./Question.module.css"
import { motion } from "motion/react"
import { Answer } from "./Answer"
import { AnswerCard } from "./AnswerCard"
import { useResizablePool } from "./useResizablePool"

type TAnswerPoolProps = {
    items: TMatchPairsAnswer[]
}

const CELL_ENTER_TRANSITION = { type: "spring", stiffness: 600, damping: 30 } as const
const HEIGHT_TRANSITION = { type: "spring", stiffness: 350, damping: 38, mass: 0.8 } as const

const AnswerPool: FC<TAnswerPoolProps> = ({ items }) => {
    const { ref: droppableRef, isDropTarget } = useDroppable({ id: "pool", accept: "match-pair" })
    const { outerRef, gridRef, measurerRef, spans, height, isHeightImmediate } = useResizablePool(items)

    const setPoolRef = useCallback(
        (el: HTMLDivElement | null) => {
            outerRef.current = el
            droppableRef(el)
        },
        [droppableRef, outerRef]
    )

    return (
        <>
            <motion.div
                ref={setPoolRef}
                className={clsx(classes["pool"], isDropTarget && classes["pool--over"])}
                animate={{ height }}
                transition={isHeightImmediate ? { duration: 0 } : HEIGHT_TRANSITION}
            >
                <div ref={gridRef} className={classes["pool__grid"]}>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            className={classes["pool__cell"]}
                            style={{ gridColumn: `span ${spans[item.id] ?? 1}` }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, gridColumn: `span ${spans[item.id]}` }}
                            transition={CELL_ENTER_TRANSITION}
                        >
                            <Answer item={item} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div ref={measurerRef} className={classes["pool__measurer"]} aria-hidden>
                {items.map((item) => (
                    <div
                        key={item.id}
                        data-measure-id={item.id}
                        className={classes["pool__measurer-card"]}
                    >
                        <AnswerCard item={item} />
                    </div>
                ))}
            </div>
        </>
    )
}

export { AnswerPool }
export type { TAnswerPoolProps }
