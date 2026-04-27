import { forwardRef, ReactNode } from "react"
import { motion, type HTMLMotionProps } from "motion/react"

type AnimatedBlockProps = {
    children: ReactNode
    width?: string
} & HTMLMotionProps<"div">

const AnimatedBlock = forwardRef<HTMLDivElement, AnimatedBlockProps>(
    ({ children, width, style, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 2000,
                    damping: 80,
                }}
                layout="position"
                style={{
                    transformOrigin: "center center",
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

export default AnimatedBlock