import clsx from "clsx"
import { useId, type InputHTMLAttributes, type ReactNode } from "react"
import classes from "./Input.module.css"
import Label from "../Label/Label"
import InputContainer from "./InputContainer"

type InputTone = 1 | 2 | 3 | 4
type InputSize = "s" | "m" | "l"
type InputRadius = "s" | "m" | "l" | "xl"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string
    tone?: InputTone
    inputSize?: InputSize
    radius?: InputRadius
    label?: ReactNode
    fullWidth?:boolean
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
    tone = 1,
    inputSize = "m",
    radius = "m",
    type = "text",
    label,
    id,
    fullWidth = false,
    ...props
}: InputProps) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    const inputClassName = clsx(
        classes["input"],
        toneClassNameMap[tone],
        sizeClassNameMap[inputSize],
        radiusClassNameMap[radius],
        fullWidth && classes["fullWidth"],
        className
    )

    return (
        <InputContainer hasLabel={!!label}>
            {label ? <Label htmlFor={inputId}>{label}</Label> : null}
            <input
                id={inputId}
                type={type}
                className={inputClassName}
                {...props}
            />
        </InputContainer>
    )
}

export default Input
export type { InputProps, InputRadius, InputSize, InputTone }
