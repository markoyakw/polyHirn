import styles from './SliderValues.module.css'

interface SliderValuesProps {
  min: number
  max: number
  currentMin: number
  currentMax: number
  format: (value: number) => string
}

export function SliderValues({ min, max, currentMin, currentMax, format }: SliderValuesProps) {
  return (
    <div className={styles.values}>
      <span className={styles.edge}>{format(min)}</span>
      <span className={styles.range}>
        {format(currentMin)} – {format(currentMax)}
      </span>
      <span className={styles.edge}>{format(max)}</span>
    </div>
  )
}
