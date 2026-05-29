"use client"
import { type FC } from "react"
import type { TMatchPairsAnswer } from "@/types/test"
import { useDraggable } from "@dnd-kit/react"
import clsx from "clsx"
import dragClasses from "@/globalStyles/drag.module.css"
import { AnswerCard } from "./AnswerCard"
import { motion } from "motion/react"

type TAnswerProps = {
    item: TMatchPairsAnswer
}

const Answer: FC<TAnswerProps> = ({ item }) => {
    const { ref, isDragging } = useDraggable({ id: item.id, type: "match-pair", data: item })

    return (
        <motion.div layoutId={item.id}>
            <AnswerCard
                ref={ref}
                item={item}
                className={clsx(isDragging && dragClasses["drag-item--is-dragging"])}
            />
        </motion.div>
    )
}

export { Answer }
export type { TAnswerProps }
