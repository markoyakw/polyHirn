import { FC, ReactNode, useMemo, type PointerEvent } from "react";
import type { TFillGapsGap, TFillGapsGapResizeSide } from "./utils";
import FillGapsGap from "./FillGapsGap";

type TFillGapsTextWithGapsProps = {
    text: string
    gapArr: TFillGapsGap[]
    deleteGap: (gapId: string) => void
    finishGapEditing: () => void
    onGapResizeStart: (
        gapId: string,
        side: TFillGapsGapResizeSide,
        event: PointerEvent
    ) => void
    setGapElementRef: (id: string, element: HTMLSpanElement | null) => void
    startGapEditing: (gapId: string) => void
}

const FillGapsTextWithGaps: FC<TFillGapsTextWithGapsProps> = ({
    text,
    gapArr,
    onGapResizeStart,
    deleteGap,
    finishGapEditing,
    setGapElementRef,
    startGapEditing,
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
                onEditingEnd={finishGapEditing}
                onEditingStart={startGapEditing}
                onResizeStart={onGapResizeStart}
                setGapElementRef={setGapElementRef}
            />
        )
        cursor = gap.end
    })

    parts.push(text.slice(cursor))

    return parts
};

export default FillGapsTextWithGaps
