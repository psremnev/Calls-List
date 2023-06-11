import { Brightness1 } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { RATE_CONFIG } from '../constants'
import { RATE_TYPE } from '../enums'

export function Rate({ type = RATE_TYPE.BAD }) {
  const config = RATE_CONFIG[type]

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginRight: '28px', minWidth: 24 }}>
        {config.count.map((key) => {
          return (
            <Brightness1
              key={key}
              sx={{
                color: config.color.secondary,
                fontSize: 8
              }}
            />
          )
        })}
      </Box>
      <Button
        sx={{
          borderColor: config.color.secondary,
          color:
            type === RATE_TYPE.GOOD
              ? 'rgba(18, 41, 69, 1)'
              : config.color.secondary,
          backgroundColor: config.color.primary,
          textTransform: 'none',
          fontSize: 14,
          width: 56,
          height: 26
        }}
        variant='outlined'
      >
        {config.title}
      </Button>
    </Box>
  )
}
