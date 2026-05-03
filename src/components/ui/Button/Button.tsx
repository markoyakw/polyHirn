import clsx from "clsx"
import type { ButtonHTMLAttributes } from "react"
import classes from "./Button.module.css"

type ButtonTone = 1 | 2 | 3 | 4 | "primary" | "ghost"
type ButtonSize = "s" | "m" | "l"
type ButtonRadius = "s" | "m" | "l" | "xl" | "none"
type ButtonHover = "brightness" | "brandColorBg" | "none"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    tone?: ButtonTone
    buttonSize?: ButtonSize
    radius?: ButtonRadius
    hover?: ButtonHover
    fullWidth?: boolean
    withBorder?: boolean
}

const toneClassNameMap: Record<ButtonTone, string> = {
    1: classes["tone1"],
    2: classes["tone2"],
    3: classes["tone3"],
    4: classes["tone4"],
    primary: classes["primary"],
    ghost: classes["ghost"],
}

const hoverClassNameMap: Record<ButtonHover, string | undefined> = {
    brightness: classes["brightness"],
    brandColorBg: classes["brandColorBg"],
    none: undefined
}

const sizeClassNameMap: Record<ButtonSize, string> = {
    s: classes["s"],
    m: classes["m"],
    l: classes["l"],
}

const radiusClassNameMap: Record<ButtonRadius, string | undefined> = {
    none: undefined,
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
    withBorder,
    hover = "brightness",
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
                hoverClassNameMap[hover],
                fullWidth && classes["fullWidth"],
                withBorder && classes["withBorder"],
                className
            )}
            {...props}
        />
    )
}

export default Button
export type { ButtonProps, ButtonRadius, ButtonSize, ButtonTone }
