import clsx from "clsx"
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import classes from "./Text.module.css"

type TextTag = "p" | "span" | "label" | "strong" | "em"
type TextSize = "xs" | "s" | "m" | "l" | "xl"
type TextTone = "primary" | "secondary" | "disabled" | "link"
type TextWeight = "regular" | "medium" | "bold"
type TextLineHeight = "tight" | "normal" | "loose"

type TextOwnProps<T extends ElementType> = {
    as?: T
    children: ReactNode
    className?: string
    size?: TextSize
    tone?: TextTone
    weight?: TextWeight
    lineHeight?: TextLineHeight
}

type TextProps<T extends ElementType> = TextOwnProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>

const Text = <T extends TextTag = "p">({
    as,
    children,
    className,
    size = "m",
    tone = "primary",
    weight = "regular",
    lineHeight = "normal",
    ...props
}: TextProps<T>) => {
    const Component = as ?? "p"

    return (
        <Component
            className={clsx(
                classes["text"],
                classes[size],
                classes[tone],
                classes[weight],
                classes[lineHeight],
                className
            )}
            {...props}
        >
            {children}
        </Component>
    )
}

export default Text
export type { TextLineHeight, TextProps, TextSize, TextTag, TextTone, TextWeight }
