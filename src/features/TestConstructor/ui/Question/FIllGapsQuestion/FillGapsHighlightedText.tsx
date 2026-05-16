import { FC, useRef } from "react";
import type { TFillGapsGap } from "./utils";
import classes from "./FillGapsQuestion.module.css"
import Tooltip from "@/components/ui/Tooltip/Tooltip";
import FillGapsTooltipContent from "./FillGapsTooltipContent";
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
    const consistsOfSpacing = !gap.value.trim()
    const onButtonClick = () => onInsertGap(gap)

    const isZeroGap = gap.start === gap.end
    // const prevNonZeroGapRef = useRef(gap)

    //to play the tooltip disappear animation smoothly
    //from the point of last highlighted text
    // if (!isZeroGap) {
    //     prevNonZeroGapRef.current = gap
    // }
    // const displayedGap = isZeroGap ? prevNonZeroGapRef.current : gap
    const displayedGap = gap
    const highlightedTextClassName = clsx(!isZeroGap && classes["highlighted-text"])

    if (isZeroGap) return null
    return (
        <>
            {text.slice(0, displayedGap.start)}
            <Tooltip
                layoutDependency={isHighlighting}
                isActive={!consistsOfSpacing && !isZeroGap}
                activateOnHover
                content={
                    <FillGapsTooltipContent
                        isHighlighting={isHighlighting}
                        onInsertGap={onButtonClick}
                    />
                }
            >
                <span className={highlightedTextClassName}>
                    {displayedGap.value}
                </span >
            </Tooltip >
            {text.slice(displayedGap.end, text.length)}
        </>
    )
};

export default FillGapsHighlightedText;
