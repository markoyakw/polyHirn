import { useRef, useCallback } from 'react'

interface UseDoubleSliderOptions {
  min: number
  max: number
  step?: number
}

interface UseDoubleSliderReturn {
  trackRef: React.RefObject<HTMLDivElement | null>
  getMinThumbProps: () => {
    position: number
    onDrag: (clientX: number) => void
    ariaValueMin: number
    ariaValueMax: number
  }
  getMaxThumbProps: () => {
    position: number
    onDrag: (clientX: number) => void
    ariaValueMin: number
    ariaValueMax: number
  }
  fillLeft: number
  fillWidth: number
}

export function useDoubleSlider(
  minVal: number,
  maxVal: number,
  onChange: (min: number, max: number) => void,
  { min, max, step = 1 }: UseDoubleSliderOptions
): UseDoubleSliderReturn {
  const trackRef = useRef<HTMLDivElement>(null)

  const pct = useCallback(
    (v: number) => ((v - min) / (max - min)) * 100,
    [min, max]
  )

  const valFromClientX = useCallback(
    (clientX: number): number => {
      const rect = trackRef.current?.getBoundingClientRect()
      if (!rect) return min
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      return Math.round((min + ratio * (max - min)) / step) * step
    },
    [min, max, step]
  )

  const handleMinDrag = useCallback(
    (clientX: number) => {
      const v = valFromClientX(clientX)
      onChange(Math.min(v, maxVal - step), maxVal)
    },
    [valFromClientX, maxVal, step, onChange]
  )

  const handleMaxDrag = useCallback(
    (clientX: number) => {
      const v = valFromClientX(clientX)
      onChange(minVal, Math.max(v, minVal + step))
    },
    [valFromClientX, minVal, step, onChange]
  )

  const fillLeft = pct(minVal)
  const fillWidth = pct(maxVal) - fillLeft

  return {
    trackRef,
    getMinThumbProps: () => ({
      position: pct(minVal),
      onDrag: handleMinDrag,
      ariaValueMin: min,
      ariaValueMax: maxVal,
    }),
    getMaxThumbProps: () => ({
      position: pct(maxVal),
      onDrag: handleMaxDrag,
      ariaValueMin: minVal,
      ariaValueMax: max,
    }),
    fillLeft,
    fillWidth,
  }
}
