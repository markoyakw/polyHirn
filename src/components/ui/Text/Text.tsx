import clsx from "clsx"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { createElement } from "react"
import classes from "./Text.module.css"

type TTextTag = "p" | "span" | "label" | "strong" | "em"
type TTextSize = "xs" | "s" | "m" | "l" | "xl"
type TTextColor = "primary" | "secondary" | "disabled" | "link"
type TTextWeight = "regular" | "medium" | "bold"
type TTextLineHeight = "tight" | "normal" | "loose"
type TTextFont = "body" | "heading"

type TTextOwnProps = {
    children: ReactNode
    className?: string
    size?: TTextSize
    color?: TTextColor
    tone?: TTextColor
    weight?: TTextWeight
    lineHeight?: TTextLineHeight
    font?: TTextFont
}

type TTextProps<T extends TTextTag> = TTextOwnProps & {
    as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof TTextOwnProps | "as">

const Text = <T extends TTextTag = "p">({
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
}: TTextProps<T>) => {
    const Component = (as ?? "p") as T
    const resolvedColor = tone ?? color

    const componentProps = props as Omit<
        ComponentPropsWithoutRef<T>,
        keyof TTextOwnProps | "as"
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
export type { TTextColor, TTextFont, TTextLineHeight, TTextProps, TTextSize, TTextTag, TTextWeight }
