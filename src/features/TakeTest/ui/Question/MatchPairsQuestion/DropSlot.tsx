import { type FC } from "react"
import type { TMatchPairsAnswer } from "@/types/test"
import { useDroppable } from "@dnd-kit/react"
import Text from "@/components/ui/Text/Text"
import { Answer } from "./Answer"
import clsx from "clsx"
import classes from "./Question.module.css"
import { motion } from "motion/react"

type TDropSlotProps = {
    leftItemId: string
    assignedItem: TMatchPairsAnswer | undefined
}

const DropSlot: FC<TDropSlotProps> = ({ leftItemId, assignedItem }) => {

    const { ref, isDropTarget } = useDroppable({
        id: leftItemId,
        accept: "match-pair",
        type: "match-pair-drop-slot",
    })

    return (
        <motion.div
            layout
            ref={ref}
            transition={{ duration: 0.1 }}
            className={clsx(classes["slot"], isDropTarget && classes["slot--over"])}
        >
            {assignedItem == null
                ? <Text as="span" size="s" color="secondary" className={classes["slot__hint"]}>
                    drop here
                </Text>
                : <Answer key={assignedItem.id} item={assignedItem} />
            }
        </motion.div>
    )
}

export { DropSlot }
export type { TDropSlotProps }
