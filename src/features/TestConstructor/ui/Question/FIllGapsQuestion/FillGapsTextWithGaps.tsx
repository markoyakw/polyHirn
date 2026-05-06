import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { TRange } from "./FillGapsQuestion";
import FillGapsGap from "./FillGapsGap";

type TFillGapsTextWithGapsProps = {
    text: string,
    rangeArr: TRange[],
    setRange: Dispatch<SetStateAction<TRange[]>>
}

const FillGapsTextWithGaps: FC<TFillGapsTextWithGapsProps> = ({ text, rangeArr, setRange }) => {

    const sorted = [...rangeArr].sort((a, b) => a[0] - b[0]);

    const { parts, cursor } = sorted.reduce<{ parts: ReactNode[]; cursor: number }>(
        (acc, range, i) => ({
            parts: [
                ...acc.parts,
                text.slice(acc.cursor, range[0]),
                <FillGapsGap
                    text={text}
                    key={i}
                    index={i}
                    range={range}
                    setRange={setRange}
                />
            ],
            cursor: range[1],
        }),
        { parts: [], cursor: 0 }
    );

    return (
        [...parts, text.slice(cursor)]
    );
};

export default FillGapsTextWithGaps;