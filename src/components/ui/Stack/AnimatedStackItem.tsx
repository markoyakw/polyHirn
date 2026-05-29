import { ComponentPropsWithRef, FC, useRef } from "react"
import { motion, type HTMLMotionProps } from "motion/react"

type TAnimatedStackItemProps = {
    children: React.ReactNode
    width?: string
    shouldSkipAppearAnimation?: boolean
    id: string
} & HTMLMotionProps<"div"> & ComponentPropsWithRef<"div">

const animate = {
    height: 'auto',
    opacity: 1,
    scale: 1,
    marginBottom: 0
}
const initial = {
    height: 0,
    opacity: 0,
    scale: 0.5,
    marginBottom: 0
}

const appearAnimationPlayedArr: string[] = []

const AnimatedStackItem: FC<TAnimatedStackItemProps> = ({
    children,
    width,
    style,
    shouldSkipAppearAnimation = false,
    ref,
    id,
    ...props
}) => {

    const idRef = useRef(id)
    const resolvedInitial = (appearAnimationPlayedArr.includes(id) || shouldSkipAppearAnimation) ? animate : initial

    const handleAnimationComplete = (e: Record<string, string>) => {
        const currentIndex = appearAnimationPlayedArr.findIndex(existingId => existingId === idRef.current)

        //if marginBottom is changed, it's an exit animation
        if (e.marginBottom) {
            if (currentIndex !== -1) {
                appearAnimationPlayedArr.splice(currentIndex, 1)
            }
            return
        }

        if (currentIndex === -1) {
            appearAnimationPlayedArr.push(idRef.current)
        }
    }

    return (
        <motion.div
            ref={ref}
            initial={resolvedInitial}
            animate={animate}
            exit={{
                height: 0,
                opacity: 0,
                scaleX: 0.3,
                scaleY: 0,
                //keep marginBottom change on exit or change handleAnimationComplete logic
                marginBottom: "calc(var(--stack-gap-size) * -1)",
                transition: {
                    type: "spring",
                    stiffness: 1200,
                    damping: 80
                }
            }}
            transition={{
                type: "spring",
                stiffness: 1600,
                damping: 80
            }}
            style={{
                transformOrigin: "top",
                width,
                ...style,
            }}
            onAnimationComplete={handleAnimationComplete}
            {...props}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedStackItem
