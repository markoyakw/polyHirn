const getLetterByIndex = (index: number, uppercase: boolean = false) => {
    if (index > 25) throw new Error("Index out of range. Must be between 0 and 25 inclusive.")
    const base = uppercase ? 65 : 97 // ASCII code for A or a
    return String.fromCharCode(base + index)
}

export default getLetterByIndex