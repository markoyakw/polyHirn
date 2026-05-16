import type { ComponentPropsWithRef } from "react"
import Button from "@/components/ui/Button/Button"
import BouncingItem from "@/components/ui/BouncingItem/BouncingItem"
import { IoMdAddCircleOutline } from "react-icons/io"
import { TbArrowBigDownFilled } from "react-icons/tb"
import classes from "./FillGapsQuestion.module.css"
import { motion } from "motion/react"

type TFillGapsTooltipContentProps = {
    buttonProps?: ComponentPropsWithRef<"button">
    onInsertGap: () => void
    isHighlighting: boolean
}

const FillGapsTooltipContent = ({
    buttonProps,
    onInsertGap,
    isHighlighting
}: TFillGapsTooltipContentProps) => {
    return (
        <div
            className={classes["insert-gap-container"]}
        >
            {
                isHighlighting
                    ?
                    <motion.div initial={{ opacity: 0, translateY: "50%" }} animate={{ opacity: 1, translateY: 0 }}>
                        select the gap range
                    </motion.div >
                    :
                    <motion.div
                        initial={{ opacity: 0, translateY: "50%" }} animate={{ opacity: 1, translateY: 0 }}
                        className={classes["insert-gap__button-container"]}
                    >
                        <span>
                            new gap
                            <BouncingItem>
                                <TbArrowBigDownFilled />
                            </BouncingItem>
                        </span>
                        <Button
                            buttonSize="s"
                            onClick={onInsertGap}
                            {...buttonProps}
                        >
                            <IoMdAddCircleOutline />
                            insert
                        </Button>
                    </motion.div>
            }
        </div>
    )
}

export default FillGapsTooltipContent
export type { TFillGapsTooltipContentProps }
