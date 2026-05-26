import { useRef } from "react"

function usePreservedValue<T>(value: T): T {
    const ref = useRef<T>(value)

    if (value != null) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current = value
    }

    return ref.current
}

export default usePreservedValue

