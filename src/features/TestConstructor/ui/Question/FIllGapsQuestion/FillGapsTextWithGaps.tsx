import { FC, ReactNode, useMemo, type PointerEvent } from "react";
import type { TFillGapsGap, TFillGapsGapResizeSide } from "./utils";
import FillGapsGap from "./FillGapsGap";

type TFillGapsTextWithGapsProps = {
    text: string
    gapArr: TFillGapsGap[]
    deleteGap: (gapId: string) => void
    onGapResizeStart: (
        gapId: TFillGapsGap["id"],
        side: TFillGapsGapResizeSide,
        event: PointerEvent
    ) => void
}

const FillGapsTextWithGaps: FC<TFillGapsTextWithGapsProps> = ({
    text,
    gapArr,
    onGapResizeStart,
    deleteGap
}) => {

    const sortedGapArr = useMemo(
        () => [...gapArr].sort((a, b) => a.start - b.start),
        [gapArr]
    )

    const parts: ReactNode[] = []
    let cursor = 0

    sortedGapArr.forEach((gap) => {
        parts.push(text.slice(cursor, gap.start))
        parts.push(
            <FillGapsGap
                deleteGap={deleteGap}
                key={gap.id}
                gap={gap}
                onResizeStart={onGapResizeStart}
            />
        )
        cursor = gap.end
    })

    parts.push(text.slice(cursor))

    return parts
};

export default FillGapsTextWithGaps;
