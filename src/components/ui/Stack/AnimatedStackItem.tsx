import { forwardRef, ReactNode } from "react"
import { motion, type HTMLMotionProps } from "motion/react"

type TAnimatedStackItemProps = {
    children: ReactNode
    width?: string
} & HTMLMotionProps<"div">

const AnimatedStackItem = forwardRef<HTMLDivElement, TAnimatedStackItemProps>(
    ({ children, width, style, ...props }, ref) => {

        return (
            <motion.div
                ref={ref}
                initial={{ height: 0, opacity: 0, scale: 0.5, marginBottom: 0 }}
                animate={{ height: 'auto', opacity: 1, scale: 1, marginBottom: 0 }}
                exit={{
                    height: 0, opacity: 0, scaleX: 0.3, scaleY: 0, marginBottom: "calc(var(--stack-gap-size, 0px) * -1)", transition: {
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
                {...props}
            >
                {children}
            </motion.div>
        )
    }
)

export default AnimatedStackItem
