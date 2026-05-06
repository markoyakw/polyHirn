import { FC, useEffect, useRef } from "react";
import type { TFillGapsGap } from "./utils";
import classes from "./FillGapsQuestion.module.css"

type TFillGapsHighlightedTextProps = {
    onInsertGap: (gap: TFillGapsGap) => void,
    text: string,
    gap: TFillGapsGap
}

const FillGapsHighlightedText: FC<TFillGapsHighlightedTextProps> = ({ text, gap, onInsertGap }) => {
    const consistsOfSpacing = !gap.value.trim()
    const insertGapButtonRef = useRef<HTMLButtonElement>(null)

    const assignInsertButtonWidhVariable = () => {
        const insertButton = insertGapButtonRef.current
        if (!insertButton) return
        const width = insertButton.getBoundingClientRect().width
        const intWidth = Math.round(width)
        insertButton.style.setProperty("--width", intWidth + "px")
    }

    useEffect(() => {
        assignInsertButtonWidhVariable()
    }, [gap])

    if (gap.start === gap.end) return text
    return (
        <>
            {text.slice(0, gap.start)}
            <span className={classes["highlighted-text"]}>
                {!consistsOfSpacing &&
                    <button ref={insertGapButtonRef} onClick={() => onInsertGap(gap)}>
                        insert a gap
                    </button>
                }
                {gap.value}
            </span>
            {text.slice(gap.end, text.length)}
        </>
    )
};

export default FillGapsHighlightedText;
