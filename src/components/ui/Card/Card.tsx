import clsx from "clsx"
import {
    forwardRef,
    type CSSProperties,
    type ComponentPropsWithRef,
    type ComponentPropsWithoutRef,
    type ElementType,
    type ReactElement,
    type ReactNode,
} from "react"
import classes from "./Card.module.css"

type CardSpacing = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "none"
type CardRadius = "s" | "m" | "l" | "xl"
type CardTone = 1 | 2 | 3 | 4
type CardWidth = "auto" | "full" | "fitContent"
type CardOverflow = "hidden" | "visible"

type CardOwnProps<T extends ElementType> = {
    as?: T
    children: ReactNode
    className?: string
    style?: CSSProperties
    tone?: CardTone
    spacing?: CardSpacing
    radius?: CardRadius
    width?: CardWidth
    overflow?: CardOverflow
    withBorder?: boolean
}

type CardProps<T extends ElementType> = CardOwnProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps<T>>

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"]

type CardComponent = <T extends ElementType = "div">(
    props: CardProps<T> & { ref?: PolymorphicRef<T> }
) => ReactElement | null

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

const widthClassNameMap: Record<CardWidth, string | undefined> = {
    auto: undefined,
    full: classes["widthFull"],
    fitContent: classes["widthFitContent"],
}

const overflowClassNameMap: Record<CardOverflow, string> = {
    hidden: classes["overflowHidden"],
    visible: classes["overflowVisible"],
}

const CardInner = <T extends ElementType = "div">({
    as,
    children,
    className,
    style,
    tone = 1,
    spacing = "m",
    radius = "m",
    width = "auto",
    overflow = "visible",
    withBorder = false,
    ...props
}: CardProps<T>, ref: PolymorphicRef<T>) => {
    const Component = as ?? "div"

    return (
        <Component
            ref={ref}
            className={clsx(
                classes["card"],
                toneClassNameMap[tone],
                spacingClassNameMap[spacing],
                radiusClassNameMap[radius],
                widthClassNameMap[width],
                overflowClassNameMap[overflow],
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

const Card = forwardRef(CardInner as any) as unknown as CardComponent

export default Card
export type { CardOverflow, CardProps, CardRadius, CardSpacing, CardTone, CardWidth }
