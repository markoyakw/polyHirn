import { useRef } from 'react'
import styles from './SliderThumb.module.css'

interface SliderThumbProps {
  position: number
  label: string
  onDrag: (clientX: number) => void
  ariaLabel: string
  ariaValueNow: number
  ariaValueMin: number
  ariaValueMax: number
}

export function SliderThumb({
  position,
  label,
  onDrag,
  ariaLabel,
  ariaValueNow,
  ariaValueMin,
  ariaValueMax,
}: SliderThumbProps) {
  const thumbRef = useRef<HTMLDivElement>(null)

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault()
    thumbRef.current?.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!e.buttons) return
    onDrag(e.clientX)
  }

  return (
    <div
      ref={thumbRef}
      role="slider"
      tabIndex={0}
      className={styles.thumb}
      style={{ left: `${position}%` }}
      aria-label={ariaLabel}
      aria-valuenow={ariaValueNow}
      aria-valuemin={ariaValueMin}
      aria-valuemax={ariaValueMax}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <span className={styles.label}>{label}</span>
    </div>
  )
}
