import { TFillGapsQuestion } from "@/features/TestConstructor/model/types";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import classes from "./FillGapsQuestion.module.css"

type TFillGapsQuestionProps = {
    question: TFillGapsQuestion
}

type TRange = [number, number]

const dummyData = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`

const FillGapsQuestion: FC<TFillGapsQuestionProps> = (question) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const mirrorDivRef = useRef<HTMLDivElement>(null)
    const insertGapButtonRef = useRef<HTMLButtonElement>(null)

    const [textareaValue, setTextareaValue] = useState<string>(dummyData)
    const [highlightedRange, setHighlightedRange] = useState<TRange>([0, 0])
    const [gapRangeArr, setGapRangeArr] = useState<TRange[]>([])

    const handleInsertRangeButtonClick = (newItem: TRange) => {
        setGapRangeArr(arr => [...arr, newItem])
    }

    const getTextWithHighlight = (text: string, range: TRange) => {
        if (range[0] === range[1]) return text
        return (
            <>
                {text.slice(0, range[0])}
                <span className={classes["highlighted-text"]}>
                    <button ref={insertGapButtonRef} onClick={() => handleInsertRangeButtonClick(range)}>
                        insert a gap
                    </button>
                    {text.slice(...range)}
                </span>
                {text.slice(range[1], text.length)}
            </>
        )
    }

    const getTextWithGaps = (text: string, rangeArr: TRange[]): React.ReactNode => {
        const sorted = [...rangeArr].sort((a, b) => a[0] - b[0]);

        const { parts, cursor } = sorted.reduce<{ parts: React.ReactNode[]; cursor: number }>(
            (acc, range, i) => ({
                parts: [
                    ...acc.parts,
                    text.slice(acc.cursor, range[0]),
                    <span key={i} className={classes["question__item"]}>
                        {text.slice(range[0], range[1])}
                    </span>,
                ],
                cursor: range[1],
            }),
            { parts: [], cursor: 0 }
        );

        return [...parts, text.slice(cursor)];
    };

    const assignInsertButtonWidhVariable = () => {
        const insertButton = insertGapButtonRef.current
        if (!insertButton) return
        const width = insertButton.getBoundingClientRect().width
        const intWidth = Math.round(width)
        console.log(intWidth)
        insertButton.style.setProperty("--width", intWidth + "px")
    }

    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        const onSelectionChange = (e: Event) => {
            if (textarea !== e.target) return
            assignInsertButtonWidhVariable()
            const startRange = textarea.selectionStart
            const endRange = textarea.selectionEnd
            setHighlightedRange([startRange, endRange])
        }

        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";

        document.addEventListener("selectionchange", onSelectionChange)
    }, [])

    const handleTextareaChange = (e: ChangeEvent) => {
        const textarea = textareaRef.current
        setTextareaValue(textarea?.value || "")
        if (!textarea) return
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }

    return (
        <div className={classes["container"]}>
            <div className={classes["mirror-div"]}>
                {getTextWithHighlight(textareaRef.current?.value || "", highlightedRange)}
            </div>
            <div className={classes["mirror-div"]}>
                {getTextWithGaps(textareaRef.current?.value || "", gapRangeArr)}
            </div>
            <textarea
                onChange={handleTextareaChange}
                value={textareaValue}
                ref={textareaRef}
                className={classes["textarea"]}
            />
        </div>
    );
};

export default FillGapsQuestion;