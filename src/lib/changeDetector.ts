type TChangeData = {
    from: number
    to: number
    lengthChange: number
};

const detectChange = (oldText: string, newText: string): TChangeData => {
    // Walk forward until texts diverge
    let from = 0;
    while (from < oldText.length && oldText[from] === newText[from]) from++;

    // Walk backward until texts diverge
    let oldTo = oldText.length;
    let newTo = newText.length;
    while (oldTo > from && newTo > from && oldText[oldTo - 1] === newText[newTo - 1]) {
        oldTo--;
        newTo--;
    }

    const lengthChange = newText.length - oldText.length

    return {
        from,
        to: oldTo,
        lengthChange
    };
}

export { detectChange }
export type { TChangeData }