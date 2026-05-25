type TChangeData = {
    from: number
    to: number
    lengthChange: number
};

type TDetectChangeParams = {
    oldText: string,
    newText: string,
    selectStart: number,
    selectEnd: number
}

const detectChange = ({
    oldText,
    newText,
    selectStart,
    selectEnd
}: TDetectChangeParams): TChangeData => {

    const from = selectStart
    const to = selectEnd

    const lengthChange = newText.length - oldText.length

    return {
        from,
        to,
        lengthChange
    };
}

export { detectChange }
export type { TChangeData }