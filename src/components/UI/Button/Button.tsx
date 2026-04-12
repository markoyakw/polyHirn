import clsx from "clsx"
import type { ButtonHTMLAttributes } from "react"
import classes from "./Button.module.css"

type ButtonTone = "primary" | "secondary" | "ghost" | "danger"
type ButtonSize = "s" | "m" | "l"
type ButtonRadius = "s" | "m" | "l" | "xl"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    tone?: ButtonTone
    buttonSize?: ButtonSize
    radius?: ButtonRadius
    fullWidth?: boolean
}

const toneClassNameMap: Record<ButtonTone, string> = {
    primary: classes["primary"],
    secondary: classes["secondary"],
    ghost: classes["ghost"],
    danger: classes["danger"],
}

const sizeClassNameMap: Record<ButtonSize, string> = {
    s: classes["s"],
    m: classes["m"],
    l: classes["l"],
}

const radiusClassNameMap: Record<ButtonRadius, string> = {
    s: classes["radiusS"],
    m: classes["radiusM"],
    l: classes["radiusL"],
    xl: classes["radiusXl"],
}

const Button = ({
    className,
    tone = "primary",
    buttonSize = "m",
    radius = "m",
    fullWidth = false,
    type = "button",
    ...props
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={clsx(
                classes["button"],
                toneClassNameMap[tone],
                sizeClassNameMap[buttonSize],
                radiusClassNameMap[radius],
                fullWidth && classes["fullWidth"],
                className
            )}
            {...props}
        />
    )
}

export default Button
export type { ButtonProps, ButtonRadius, ButtonSize, ButtonTone }
