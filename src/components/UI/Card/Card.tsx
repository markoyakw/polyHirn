import clsx from "clsx"
import type { CSSProperties, ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import classes from "./Card.module.css"

type CardSpacing = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "none"
type CardRadius = "s" | "m" | "l" | "xl"
type CardTone = 1 | 2 | 3 | 4

type CardOwnProps<T extends ElementType> = {
    as?: T
    children: ReactNode
    className?: string
    style?: CSSProperties
    tone?: CardTone
    spacing?: CardSpacing
    radius?: CardRadius
    withBorder?: boolean
}

type CardProps<T extends ElementType> = CardOwnProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps<T>>

const toneClassNameMap: Record<CardTone, string> = {
    1: classes["tone1"],
    2: classes["tone2"],
    3: classes["tone3"],
    4: classes["tone4"],
}

const spacingClassNameMap: Record<CardSpacing, string> = {
    xxs: classes["spacingXxs"],
    xs: classes["spacingXs"],
    s: classes["spacingS"],
    m: classes["spacingM"],
    l: classes["spacingL"],
    xl: classes["spacingXl"],
    none: classes["spacingNone"]
}

const radiusClassNameMap: Record<CardRadius, string> = {
    s: classes["radiusS"],
    m: classes["radiusM"],
    l: classes["radiusL"],
    xl: classes["radiusXl"],
}

const Card = <T extends ElementType = "div">({
    as,
    children,
    className,
    style,
    tone = 1,
    spacing = "m",
    radius = "m",
    withBorder = false,
    ...props
}: CardProps<T>) => {

    const Component = as ?? "div"

    return (
        <Component
            className={clsx(
                classes["card"],
                toneClassNameMap[tone],
                spacingClassNameMap[spacing],
                radiusClassNameMap[radius],
                withBorder && classes["withBorder"],
                className
            )}
            style={style}
            {...props}
        >
            {children}
        </Component>
    )
}

export default Card
export type { CardProps, CardRadius, CardSpacing, CardTone }
