import clsx from "clsx"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { createElement } from "react"
import classes from "./Text.module.css"

type TextTag = "p" | "span" | "label" | "strong" | "em"
type TextSize = "xs" | "s" | "m" | "l" | "xl"
type TextColor = "primary" | "secondary" | "disabled" | "link"
type TextWeight = "regular" | "medium" | "bold"
type TextLineHeight = "tight" | "normal" | "loose"
type TextFont = "body" | "heading"

type TextOwnProps = {
    children: ReactNode
    className?: string
    size?: TextSize
    color?: TextColor
    tone?: TextColor
    weight?: TextWeight
    lineHeight?: TextLineHeight
    font?: TextFont
}

type TextProps<T extends TextTag> = TextOwnProps & {
    as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps | "as">

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
    const Component = (as ?? "p") as T
    const resolvedColor = tone ?? color

    const componentProps = props as Omit<
        ComponentPropsWithoutRef<T>,
        keyof TextOwnProps | "as"
    >

    return createElement(
        Component,
        {
            className: clsx(
                classes.text,
                classes[font],
                classes[size],
                classes[resolvedColor],
                classes[weight],
                classes[lineHeight],
                className
            ),
            ...componentProps,
        },
        children
    )
}

export default Text
export type { TextColor, TextFont, TextLineHeight, TextProps, TextSize, TextTag, TextWeight }
