import { getFormatDateValue } from "./getFormatDateValue"

export const getFormatDate = (d) => {
  return `${d.getFullYear()}-${getFormatDateValue(
    d.getMonth()
  )}-${getFormatDateValue(d.getDate())}`
}
