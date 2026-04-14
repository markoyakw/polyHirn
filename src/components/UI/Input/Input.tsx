import clsx from "clsx"
import type { InputHTMLAttributes } from "react"
import classes from "./Input.module.css"

type InputTone = 1 | 2 | 3 | 4
type InputSize = "s" | "m" | "l"
type InputRadius = "s" | "m" | "l" | "xl"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string
    label?: string
    tone?: InputTone
    inputSize?: InputSize
    radius?: InputRadius
}

const toneClassNameMap: Record<InputTone, string> = {
    1: classes["tone1"],
    2: classes["tone2"],
    3: classes["tone3"],
    4: classes["tone4"],
}

const sizeClassNameMap: Record<InputSize, string> = {
    s: classes["s"],
    m: classes["m"],
    l: classes["l"],
}

const radiusClassNameMap: Record<InputRadius, string> = {
    s: classes["radiusS"],
    m: classes["radiusM"],
    l: classes["radiusL"],
    xl: classes["radiusXl"],
}

const Input = ({
    className,
    label,
    tone = 1,
    inputSize = "m",
    radius = "m",
    type = "text",
    id,
    ...props
}: InputProps) => {
    const inputClassName = clsx(
        classes["input"],
        toneClassNameMap[tone],
        sizeClassNameMap[inputSize],
        radiusClassNameMap[radius],
        className
    )

    if (label) {
        return (
            <label className={classes["field"]} htmlFor={id}>
                <span className={classes["label"]}>{label}</span>
                <input
                    id={id}
                    type={type}
                    className={inputClassName}
                    {...props}
                />
            </label>
        )
    }

    return (
        <input
            id={id}
            type={type}
            className={inputClassName}
            {...props}
        />
    )
}

export default Input
export type { InputProps, InputRadius, InputSize, InputTone }
