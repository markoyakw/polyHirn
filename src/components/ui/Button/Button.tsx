import clsx from "clsx"
import type { ButtonHTMLAttributes } from "react"
import classes from "./Button.module.css"

type TButtonTone = 1 | 2 | 3 | 4 | "primary" | "ghost"
type TButtonSize = "s" | "m" | "l"
type TButtonRadius = "s" | "m" | "l" | "xl" | "none"
type TButtonHover = "brightness" | "brandColorBg" | "none"

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    tone?: TButtonTone
    buttonSize?: TButtonSize
    radius?: TButtonRadius
    hover?: TButtonHover
    fullWidth?: boolean
    withBorder?: boolean
}

const toneClassNameMap: Record<TButtonTone, string> = {
    1: classes["tone1"],
    2: classes["tone2"],
    3: classes["tone3"],
    4: classes["tone4"],
    primary: classes["primary"],
    ghost: classes["ghost"],
}

const hoverClassNameMap: Record<TButtonHover, string | undefined> = {
    brightness: classes["brightness"],
    brandColorBg: classes["brandColorBg"],
    none: undefined
}

const sizeClassNameMap: Record<TButtonSize, string> = {
    s: classes["s"],
    m: classes["m"],
    l: classes["l"],
}

const radiusClassNameMap: Record<TButtonRadius, string | undefined> = {
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
}: TButtonProps) => {
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
export type { TButtonProps, TButtonRadius, TButtonSize, TButtonTone }
