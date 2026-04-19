import clsx from "clsx"
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import classes from "./Text.module.css"

type TextTag = "p" | "span" | "label" | "strong" | "em"
type TextSize = "xs" | "s" | "m" | "l" | "xl"
type TextColor = "primary" | "secondary" | "disabled" | "link"
type TextWeight = "regular" | "medium" | "bold"
type TextLineHeight = "tight" | "normal" | "loose"
type TextFont = "body" | "heading"

type TextOwnProps<T extends ElementType> = {
    as?: T
    children: ReactNode
    className?: string
    size?: TextSize
    color?: TextColor
    tone?: TextColor
    weight?: TextWeight
    lineHeight?: TextLineHeight
    font?: TextFont
}

type TextProps<T extends ElementType> = TextOwnProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>

const Text = <T extends TextTag = "p">({
    as,
    children,
    className,
    size = "m",
    color = "primary",
    tone,
    weight = "regular",
    lineHeight = "normal",
    font = "body",
    ...props
}: TextProps<T>) => {
    const Component = as ?? "p"
    const resolvedColor = tone ?? color

    return (
        <Component
            className={clsx(
                classes["text"],
                classes[font],
                classes[size],
                classes[resolvedColor],
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
export type { TextColor, TextFont, TextLineHeight, TextProps, TextSize, TextTag, TextWeight }
