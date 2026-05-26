import { type FC } from "react"
import { motion } from "motion/react"
import Button from "@/components/ui/Button/Button"
import BouncingItem from "@/components/ui/BouncingItem/BouncingItem"
import { IoMdAddCircleOutline } from "react-icons/io"
import { TbArrowBigDownFilled } from "react-icons/tb"
import classes from "./FillGapsQuestion.module.css"

type TFillGapsTooltipContentProps = {
    isHighlighting: boolean
    onInsertGap: () => void
}

const FillGapsTooltipContent: FC<TFillGapsTooltipContentProps> = ({
    isHighlighting,
    onInsertGap,
}) => {

    return (
        <div className={classes["insert-gap-container"]}>
            {
                isHighlighting
                    ? <motion.div
                        key="highlighting"
                        initial={{ opacity: 0, translateY: "20%" }}
                        animate={{ opacity: 1, translateY: 0 }}
                    >
                        select the gap range
                    </motion.div >
                    : <motion.div
                        key="insert-gap"
                        initial={{ opacity: 0, translateY: "20%" }}
                        animate={{ opacity: 1, translateY: 0 }}
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
