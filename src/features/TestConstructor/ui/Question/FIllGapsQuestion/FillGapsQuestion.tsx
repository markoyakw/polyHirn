import type { TFillGapsQuestion } from "@/features/TestConstructor/model/types";
import { type ChangeEvent, type FC, type ReactNode, useEffect, useRef, useState } from "react";
import classes from "./FillGapsQuestion.module.css"
import clsx from "clsx";
import { detectChange, type TChangeData } from "@/lib/changeDetector";
import Textarea from "@/components/ui/Textarea/Textarea";
import FillGapsHighlightedText from "./FillGapsHighlightedText";
import FillGapsTextWithGaps from "./FillGapsTextWithGaps";

type TFillGapsQuestionProps = {
    question: TFillGapsQuestion
}

export type TRange = [number, number]

const getRangeWithChanges = (range: TRange, change: TChangeData, textInRange: string): TRange | null => {
    const [start, end] = range;
    const charsCountDifference = change.lengthChange - (change.to - change.from);
    const shift = change.to - change.from;

    // range points at a string, consisting onlt of spacings
    const trimmedText = textInRange.slice(range[0], range[1]).trim()
    if (!trimmedText) return null

    // range is deleted/corrupted
    if (range[0] === range[1]) return null

    // Change is after range - no effect
    if (change.from >= end) return range;

    // Change is before range
    if (change.to <= start) {
        if (charsCountDifference > 0) return [start + charsCountDifference, end + charsCountDifference]
        return [start - shift, end - shift];
    }

    // Change ins inside the range
    return [range[0], range[1] + change.lengthChange];
};

const dummyData = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`

const FillGapsQuestion: FC<TFillGapsQuestionProps> = () => {

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const [textareaValue, setTextareaValue] = useState<string>(dummyData)
    const [highlightedRange, setHighlightedRange] = useState<TRange>([0, 0])
    const [gapRangeArr, setGapRangeArr] = useState<TRange[]>([])

    const handleInsertRangeButtonClick = (newRange: TRange) => {
        const trimmedTextInRange = textareaValue.slice(newRange[0], newRange[1]).trim()
        if (!trimmedTextInRange) return
        setGapRangeArr(arr => [...arr, newRange])
        setHighlightedRange([0, 0])
    }

    useEffect(() => {
        const textarea = textareaRef.current
        if (!textarea) return

        const onSelectionChange = () => {
            if (document.activeElement !== textarea) return
            const startRange = textarea.selectionStart
            const endRange = textarea.selectionEnd
            setHighlightedRange([startRange, endRange])
        }
        document.addEventListener("selectionchange", onSelectionChange)

        return () => {
            document.removeEventListener("selectionchange", onSelectionChange)
        }
    }, [])

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        const change = detectChange(textareaValue, newValue)

        setGapRangeArr(prev =>
            prev
                .map(range => getRangeWithChanges(range, change, newValue))
                .filter(Boolean) as TRange[]
        );

        setTextareaValue(newValue);
    }

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        // if (e.buttons !== 1) return;
        const pos = document.caretPositionFromPoint(e.clientX, e.clientY);
        console.log(pos?.offsetNode.parentElement)
        if (!pos) return;
        const targetNode = pos.offsetNode;
        const localOffset = pos.offset;
        console.log(localOffset)
        console.log(targetNode)


        // setRange((oldRange) =>
        //     oldRange.map((range, i) => i === index ? [position, range[1]] : range)
        // );
    };

    return (
        <div className={classes["container"]} onMouseMove={handleMouseMove}
        >
            <div className={classes["mirror-div"]}>
                <FillGapsHighlightedText
                    onInsertGap={handleInsertRangeButtonClick}
                    text={textareaValue}
                    range={highlightedRange}
                />
            </div>
            <div className={clsx(classes["mirror-div"], classes["mirror-div--gaps"])}>
                <FillGapsTextWithGaps
                    setRange={setGapRangeArr}
                    text={textareaValue}
                    rangeArr={gapRangeArr}
                />
            </div>
            <Textarea
                onChange={handleTextareaChange}
                value={textareaValue}
                ref={textareaRef}
                className={classes["textarea"]}
                onMouseLeave={() => setHoveredIndex(null)}
            />
        </div>
    );
};

export default FillGapsQuestion;
