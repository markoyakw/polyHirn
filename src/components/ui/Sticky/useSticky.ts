"use client"

import { useEffect, useRef, useState } from "react"

type TUseStickyParams = {
    onStuckChange?: (isStuck: boolean) => unknown
    showOnScrollUp?: boolean
    top?: number | string
}

const getTopOffset = (top: number | string) => {
    return typeof top === "number" ? top : Number.parseFloat(top) || 0
}

const getIsSticky = (element: Element, topOffset: number) => {
    return element.getBoundingClientRect().top <= topOffset
}

const useSticky = ({
    onStuckChange,
    showOnScrollUp = false,
    top = 0,
}: TUseStickyParams) => {
    const elementRef = useRef<Element | null>(null)
    const lastScrollYRef = useRef(0)
    const [isSticky, setIsSticky] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const element = elementRef.current

        if (!element) {
            return
        }

        const topOffset = getTopOffset(top)
        let previousIsSticky = false

        const updateStickyState = () => {
            const nextElement = elementRef.current

            if (!nextElement) {
                return
            }

            const currentScrollY = window.scrollY
            const isScrollingUp = currentScrollY < lastScrollYRef.current
            const nextIsSticky = getIsSticky(nextElement, topOffset)

            setIsSticky(nextIsSticky)

            // Hidden-on-scroll only applies after the element has actually reached
            // its sticky threshold. Before that point it should behave like normal flow content.
            if (!showOnScrollUp || !nextIsSticky) {
                setIsVisible(true)
            } else {
                setIsVisible(isScrollingUp || currentScrollY <= topOffset)
            }

            // Keep the callback edge-triggered so consumers only react to actual
            // stuck/unstuck transitions, not every scroll event.

            if (nextIsSticky !== previousIsSticky) {
                onStuckChange?.(nextIsSticky)
                previousIsSticky = nextIsSticky
            }

            lastScrollYRef.current = currentScrollY
        }

        lastScrollYRef.current = window.scrollY
        updateStickyState()

        window.addEventListener("scroll", updateStickyState, { passive: true })
        window.addEventListener("resize", updateStickyState)

        return () => {
            window.removeEventListener("scroll", updateStickyState)
            window.removeEventListener("resize", updateStickyState)
        }
    }, [onStuckChange, showOnScrollUp, top])

    return {
        elementRef,
        isSticky,
        isVisible,
    }
}

export { useSticky }
