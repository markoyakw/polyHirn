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
    1: classes["tone-1"],
    2: classes["tone-2"],
    3: classes["tone-3"],
    4: classes["tone-4"],
}

const spacingClassNameMap: Record<TCardSpacing, string> = {
    xxs: classes["spacing-xxs"],
    xs: classes["spacing-xs"],
    s: classes["spacing-s"],
    m: classes["spacing-m"],
    l: classes["spacing-l"],
    xl: classes["spacing-xl"],
    none: classes["spacing-none"]
}

const radiusClassNameMap: Record<TCardRadius, string> = {
    s: classes["radius-s"],
    m: classes["radius-m"],
    l: classes["radius-l"],
    xl: classes["radius-xl"],
}

const widthClassNameMap: Record<TCardWidth, string | undefined> = {
    auto: undefined,
    full: classes["width-full"],
    fitContent: classes["width-fit-content"],
}

const overflowClassNameMap: Record<TCardOverflow, string> = {
    hidden: classes["overflow-hidden"],
    visible: classes["overflow-visible"],
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
                withBorder && classes["with-border"],
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
