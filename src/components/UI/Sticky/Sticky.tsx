"use client"

import clsx from "clsx"
import {
    type CSSProperties,
    type ComponentPropsWithRef,
    type ComponentPropsWithoutRef,
    type ElementType,
    type ReactNode,
    useEffect,
    useRef,
    useState,
} from "react"
import classes from "./Sticky.module.css"

type StickyOwnProps<T extends ElementType> = {
    as?: T
    children: ReactNode
    className?: string
    style?: CSSProperties
    top?: number | string
    showOnScrollUp?: boolean
}

type StickyProps<T extends ElementType> = StickyOwnProps<T> &
    Omit<ComponentPropsWithoutRef<T>, keyof StickyOwnProps<T>>

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"]

const Sticky = <T extends ElementType = "div">({
    as,
    children,
    className,
    style,
    top = 0,
    showOnScrollUp = false,
    ...props
}: StickyProps<T>) => {
    const Component = as ?? "div"
    const elementRef = useRef<Element | null>(null)
    const lastScrollYRef = useRef(0)
    const [isSticky, setIsSticky] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        lastScrollYRef.current = window.scrollY

        const topOffset = typeof top === "number" ? top : Number.parseFloat(top) || 0

        const updateStickyState = () => {
            const element = elementRef.current

            if (!element) {
                return
            }

            const currentScrollY = window.scrollY
            const isScrollingUp = currentScrollY < lastScrollYRef.current
            const nextIsSticky = element.getBoundingClientRect().top <= topOffset

            setIsSticky(nextIsSticky)

            if (!showOnScrollUp || !nextIsSticky) {
                setIsVisible(true)
            } else {
                setIsVisible(isScrollingUp || currentScrollY <= topOffset)
            }

            lastScrollYRef.current = currentScrollY
        }

        updateStickyState()
        window.addEventListener("scroll", updateStickyState, { passive: true })
        window.addEventListener("resize", updateStickyState)

        return () => {
            window.removeEventListener("scroll", updateStickyState)
            window.removeEventListener("resize", updateStickyState)
        }
    }, [showOnScrollUp, top])

    return (
        <Component
            ref={elementRef as PolymorphicRef<T>}
            className={clsx(
                classes["sticky"],
                (!showOnScrollUp || !isSticky || isVisible) && classes["sticky--visible"],
                showOnScrollUp && isSticky && !isVisible && classes["sticky--hidden"],
                className
            )}
            style={{
                "--sticky-top": typeof top === "number" ? `${top}px` : top,
                ...style,
            } as CSSProperties}
            {...props}
        >
            {children}
        </Component>
    )
}

export default Sticky
export type { StickyProps }