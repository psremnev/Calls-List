import { getFormatDateValue } from "./getFormatDateValue"

export const getDuration = (time: number, step = 60) => {
  if (!time) {
    return '00:00'
  }
  const [min, sec] = String(time / step).split('.')
  if (!min || !sec) {
    return '00:00'
  }
  return `${getFormatDateValue(min.slice(0, 2))}:${getFormatDateValue(
    sec.slice(0, 1)
  )}`
}
