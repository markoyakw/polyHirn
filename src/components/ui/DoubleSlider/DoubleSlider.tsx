import { useState } from 'react'
import { useDoubleSlider } from './useDoubleSlider'
import { SliderTrack } from './SliderTrack'
import { SliderThumb } from './SliderThumb'
import { SliderValues } from './SliderValues'
import styles from './DoubleSlider.module.css'
import './variables.css'

interface DoubleSliderProps {
  label?: string
  min?: number
  max?: number
  step?: number
  defaultMin?: number
  defaultMax?: number
  format?: (value: number) => string
  onChange?: (min: number, max: number) => void
}

export function DoubleSlider({
  label = 'Range',
  min = 0,
  max = 1000,
  step = 1,
  defaultMin = 200,
  defaultMax = 750,
  format = (v) => `$${v.toLocaleString()}`,
  onChange,
}: DoubleSliderProps) {
  const [minVal, setMinVal] = useState(defaultMin)
  const [maxVal, setMaxVal] = useState(defaultMax)

  function handleChange(newMin: number, newMax: number) {
    setMinVal(newMin)
    setMaxVal(newMax)
    onChange?.(newMin, newMax)
  }

  const { trackRef, getMinThumbProps, getMaxThumbProps, fillLeft, fillWidth } =
    useDoubleSlider(minVal, maxVal, handleChange, { min, max, step })

  return (
    <div className={styles.root}>
      {label && <div className={styles.header}>{label}</div>}
      <SliderTrack fillLeft={fillLeft} fillWidth={fillWidth} trackRef={trackRef}>
        <SliderThumb
          {...getMinThumbProps()}
          label={format(minVal)}
          ariaLabel="Minimum value"
          ariaValueNow={minVal}
        />
        <SliderThumb
          {...getMaxThumbProps()}
          label={format(maxVal)}
          ariaLabel="Maximum value"
          ariaValueNow={maxVal}
        />
      </SliderTrack>
      <SliderValues
        min={min}
        max={max}
        currentMin={minVal}
        currentMax={maxVal}
        format={format}
      />
    </div>
  )
}
