import { FC, useEffect, useRef } from "react";
import { TRange } from "./FillGapsQuestion";
import classes from "./FillGapsQuestion.module.css"

type TFillGapsHighlightedTextProps = {
    onInsertGap: (range: TRange) => void,
    text: string,
    range: TRange
}

const FillGapsHighlightedText: FC<TFillGapsHighlightedTextProps> = ({ text, range, onInsertGap }) => {
    const consistsOfSpacing = !text.slice(...range).trim()
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
    }, [range])

    if (range[0] === range[1]) return text
    return (
        <>
            {text.slice(0, range[0])}
            <span className={classes["highlighted-text"]}>
                {!consistsOfSpacing &&
                    <button ref={insertGapButtonRef} onClick={() => onInsertGap(range)}>
                        insert a gap
                    </button>
                }
                {text.slice(...range)}
            </span>
            {text.slice(range[1], text.length)}
        </>
    )
};

export default FillGapsHighlightedText;
