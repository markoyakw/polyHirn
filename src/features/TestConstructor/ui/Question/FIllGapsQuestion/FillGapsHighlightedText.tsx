import { FC, useEffect, useRef, useState } from "react";
import type { TFillGapsGap } from "./utils";
import classes from "./FillGapsQuestion.module.css"
import FillGapsTooltipContent from "./FillGapsTooltipContent";
import Tooltip from "@/components/ui/Tooltip/Tooltip";
import clsx from "clsx";

type TFillGapsHighlightedTextProps = {
    onInsertGap: (gap: TFillGapsGap) => void,
    text: string,
    gap: TFillGapsGap
    isHighlighting: boolean
}

const FillGapsHighlightedText: FC<TFillGapsHighlightedTextProps> = ({
    text,
    gap,
    onInsertGap,
    isHighlighting
}) => {

    const [isClickedRecently, setIsClickedRecently] = useState(false)
    const consistsOfSpacing = !gap.value.trim()
    const onButtonClick = () => onInsertGap(gap)

    const isZeroGap = gap.start === gap.end
    const isHighlightingNonZeroText = !isZeroGap && isHighlighting
    const isHighlightingResolved = !isClickedRecently && isHighlightingNonZeroText

    //use previous valid value so the exit animation plays on the right spot,
    //where the element was, instead of jumping to a new caret position

    const lastNonZeroGapRef = useRef(gap)
    if (!isZeroGap) {
        // disable the lint message, because the ref depends on the
        // value that triggers rerenders and creating a new state is not needed

        // eslint-disable-next-line react-hooks/refs
        lastNonZeroGapRef.current = gap
    }
    const displayedGap = lastNonZeroGapRef.current
    const highlightedTextClassName = clsx(!isZeroGap && classes["highlighted-text"])


    //to show the right tooltip content immediately
    useEffect(function doubleClickHandler() {
        const TIME_BETWEEN_CLICKS = 550
        let betweenDoubleClickTimer: NodeJS.Timeout

        const handleClick = () => {
            setIsClickedRecently(true)
            clearTimeout(betweenDoubleClickTimer)
            betweenDoubleClickTimer = setTimeout(() => {
                setIsClickedRecently(false)
            }, TIME_BETWEEN_CLICKS);
        }

        document.addEventListener("click", handleClick)
        return () => {
            clearTimeout(betweenDoubleClickTimer)
            document.removeEventListener("click", handleClick)
        }
    }, [])

    return (
        <>
            {/* eslint-disable-next-line react-hooks/refs */}
            {text.slice(0, displayedGap.start)}
            <Tooltip
                isActive={!consistsOfSpacing}
                contentClassName={classes["tooltip-content"]}
                content={
                    <FillGapsTooltipContent
                        isHighlighting={isHighlightingResolved}
                        onInsertGap={onButtonClick}
                    />
                }
            >
                <span className={highlightedTextClassName}>
                    {/* eslint-disable-next-line react-hooks/refs */}
                    {displayedGap.value}
                </span >
            </Tooltip >
            {/* eslint-disable-next-line react-hooks/refs */}
            {text.slice(displayedGap.end, text.length)}
        </>
    )
};

export default FillGapsHighlightedText;
