import clsx from "clsx"
import type { ComponentPropsWithRef } from "react"
import classes from "./Button.module.css"

type TButtonTone = 1 | 2 | 3 | 4 | "primary" | "ghost"
type TButtonSize = "s" | "m" | "l"
type TButtonRadius = "s" | "m" | "l" | "xl" | "none"
type TButtonHover = "brightness" | "brandColorBg" | "none"

type TButtonProps = ComponentPropsWithRef<"button"> & {
    className?: string
    tone?: TButtonTone
    buttonSize?: TButtonSize
    radius?: TButtonRadius
    hover?: TButtonHover
    fullWidth?: boolean
    withBorder?: boolean
}

const toneClassNameMap: Record<TButtonTone, string> = {
    1: classes["tone-1"],
    2: classes["tone-2"],
    3: classes["tone-3"],
    4: classes["tone-4"],
    primary: classes["primary"],
    ghost: classes["ghost"],
}

const hoverClassNameMap: Record<TButtonHover, string | undefined> = {
    brightness: classes["brightness"],
    brandColorBg: classes["brand-color-bg"],
    none: undefined
}

const sizeClassNameMap: Record<TButtonSize, string> = {
    s: classes["s"],
    m: classes["m"],
    l: classes["l"],
}

const radiusClassNameMap: Record<TButtonRadius, string | undefined> = {
    none: undefined,
    s: classes["radius-s"],
    m: classes["radius-m"],
    l: classes["radius-l"],
    xl: classes["radius-xl"],
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
                fullWidth && classes["full-width"],
                withBorder && classes["with-border"],
                className
            )}
            {...props}
        />
    )
}

export default Button
export type { TButtonProps, TButtonRadius, TButtonSize, TButtonTone }
