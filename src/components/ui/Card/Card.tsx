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

type TCardSpacing = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "none"
type TCardRadius = "s" | "m" | "l" | "xl"
type TCardTone = 1 | 2 | 3 | 4
type TCardWidth = "auto" | "full" | "fitContent"
type TCardOverflow = "hidden" | "visible"

type TCardOwnProps<T extends ElementType> = {
    as?: T
    children: ReactNode
    className?: string
    style?: CSSProperties
    tone?: TCardTone
    spacing?: TCardSpacing
    radius?: TCardRadius
    width?: TCardWidth
    overflow?: TCardOverflow
    withBorder?: boolean
}

type TCardProps<T extends ElementType> = TCardOwnProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof TCardOwnProps<T>>

type TPolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"]

type TCardComponent = <T extends ElementType = "div">(
    props: TCardProps<T> & { ref?: TPolymorphicRef<T> }
) => ReactElement | null

const toneClassNameMap: Record<TCardTone, string> = {
    1: classes["tone1"],
    2: classes["tone2"],
    3: classes["tone3"],
    4: classes["tone4"],
}

const spacingClassNameMap: Record<TCardSpacing, string> = {
    xxs: classes["spacingXxs"],
    xs: classes["spacingXs"],
    s: classes["spacingS"],
    m: classes["spacingM"],
    l: classes["spacingL"],
    xl: classes["spacingXl"],
    none: classes["spacingNone"]
}

const radiusClassNameMap: Record<TCardRadius, string> = {
    s: classes["radiusS"],
    m: classes["radiusM"],
    l: classes["radiusL"],
    xl: classes["radiusXl"],
}

const widthClassNameMap: Record<TCardWidth, string | undefined> = {
    auto: undefined,
    full: classes["widthFull"],
    fitContent: classes["widthFitContent"],
}

const overflowClassNameMap: Record<TCardOverflow, string> = {
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
}: TCardProps<T>, ref: TPolymorphicRef<T>) => {
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

const Card = forwardRef(CardInner as any) as unknown as TCardComponent

export default Card
export type { TCardOverflow, TCardProps, TCardRadius, TCardSpacing, TCardTone, TCardWidth }
