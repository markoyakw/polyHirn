import { Dispatch, FC, SetStateAction, useState } from "react"
import { TRange } from "./FillGapsQuestion"
import { BiSolidLeftArrow } from "react-icons/bi"
import classes from "./FillGapsQuestion.module.css"
import clsx from "clsx"

type TFillGapsGapProps = {
    text: string,
    range: TRange
    setRange: Dispatch<SetStateAction<TRange[]>>
    index: number
}

const FillGapsGap: FC<TFillGapsGapProps> = ({
    text,
    range,
    setRange,
    index
}) => {

    return (
        <span className={classes["gap"]} data-range={range}>
            <span className={classes["gap__size-handle"]} >
                <BiSolidLeftArrow />
            </span>
            {text.slice(range[0], range[1])}
            <span className={classes["gap__size-handle"]} >
                <BiSolidLeftArrow />
            </span>
        </span>
    )
}

export default FillGapsGap