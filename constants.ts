import { RATE_TYPE } from './enums'

export const RATE_CONFIG = {
  [RATE_TYPE.BAD]: {
    title: 'Плохо',
    count: [1],
    color: {
      primary: 'rgba(254, 233, 239, 1)',
      secondary: 'rgba(234, 26, 79, 1)'
    }
  },
  [RATE_TYPE.GOOD]: {
    title: 'Хорошо',
    count: [1, 2],
    color: {
      primary: 'rgba(216, 228, 251, 1)',
      secondary: 'rgba(173, 191, 223, 1)'
    }
  },
  [RATE_TYPE.GREAT]: {
    title: 'Отлично',
    count: [1, 2, 3],
    color: {
      primary: 'rgba(219, 248, 239, 1)',
      secondary: 'rgba(40, 168, 121, 1)'
    }
  }
}