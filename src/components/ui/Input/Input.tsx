import clsx from "clsx"
import { useId, type InputHTMLAttributes, type ReactNode } from "react"
import classes from "./Input.module.css"
import Label from "../Label/Label"
import InputContainer from "./InputContainer"

type TInputTone = 1 | 2 | 3 | 4
type TInputSize = "s" | "m" | "l"
type TInputRadius = "s" | "m" | "l" | "xl"

type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string
    tone?: TInputTone
    inputSize?: TInputSize
    radius?: TInputRadius
    label?: ReactNode
    fullWidth?:boolean
}

const toneClassNameMap: Record<TInputTone, string> = {
    1: classes["tone-1"],
    2: classes["tone-2"],
    3: classes["tone-3"],
    4: classes["tone-4"],
}

const sizeClassNameMap: Record<TInputSize, string> = {
    s: classes["s"],
    m: classes["m"],
    l: classes["l"],
}

const radiusClassNameMap: Record<TInputRadius, string> = {
    s: classes["radius-s"],
    m: classes["radius-m"],
    l: classes["radius-l"],
    xl: classes["radius-xl"],
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
}: TInputProps) => {
    const generatedId = useId()
    const inputId = id ?? generatedId

    const inputClassName = clsx(
        classes["input"],
        toneClassNameMap[tone],
        sizeClassNameMap[inputSize],
        radiusClassNameMap[radius],
        fullWidth && classes["full-width"],
        className
    )

    return (
        <InputContainer hasLabel={!!label} fullWidth={fullWidth}>
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
export type { TInputProps, TInputRadius, TInputSize, TInputTone }
