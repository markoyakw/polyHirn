import styles from './SliderTrack.module.css'

interface SliderTrackProps {
  fillLeft: number
  fillWidth: number
  trackRef: React.RefObject<HTMLDivElement | null>
  children: React.ReactNode
}

export function SliderTrack({ fillLeft, fillWidth, trackRef, children }: SliderTrackProps) {
  return (
    <div ref={trackRef} className={styles.track}>
      <div
        className={styles.fill}
        style={{ left: `${fillLeft}%`, width: `${fillWidth}%` }}
      />
      {children}
    </div>
  )
}
