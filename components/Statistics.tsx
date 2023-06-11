import { Box, LinearProgress } from '@mui/material'

export function Statistics({ title, progress, progressText, color, sx = {} }) {
  return (
    <Box
      sx={{
        ...{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 14,
          overflow: 'hidden'
        },
        ...sx
      }}
    >
      <span
        style={{
          color,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}
      >
        {title}{' '}
        <span>
          {progressText}
        </span>
      </span>
      <LinearProgress
        sx={{
          borderRadius: 12,
          background: 'rgba(222, 230, 245, 1)',
          '& .MuiLinearProgress-bar1Determinate': {
            backgroundColor: color
          },
          marginTop: '7px'
        }}
        variant='determinate'
        value={progress}
      />
    </Box>
  )
}
