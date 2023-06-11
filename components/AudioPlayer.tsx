import { Download, Pause, PlayArrow } from '@mui/icons-material'
import { Box, Slider, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getFormatDateValue } from '../utils/getFormatDateValue'

const createAudio = () => {
  const audio = new Audio()
  audio.src = 'public/test.mp3'
  return audio
}

const getDuration = (timeInSec) => {
  if (!timeInSec) {
    return '00:00'
  }
  const timeRound = Math.round(timeInSec)
  const min = String(timeRound / 60).split('.')[0]
  const sec =
    timeRound < 60 ? String(timeRound) : String(timeRound % 60).split('.')[0]
  return `${getFormatDateValue(min)}:${getFormatDateValue(sec)}`
}

export function AudioPlayer() {
  const [audio, setAudio] = useState(createAudio())
  const [isPlay, setIsPlay] = useState(false)
  const [duration, setDuration] = useState(getDuration(null))
  const [progress, setProgress] = useState(0)
  const [max, setMax] = useState(0)

  const onPlay = (e) => {
    if (!max) {
      setMax(audio.duration)
    }
    setProgress(audio.currentTime)
    setDuration(getDuration(audio.currentTime))
  }

  useEffect(() => {
    audio.addEventListener('timeupdate', onPlay)
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onPlay)
    }
  }, [])

  const onPlayBtnClick = () => {
    isPlay ? audio.pause() : audio.play()
    setIsPlay(!isPlay)
  }

  const onSliderChange = (e) => {
    audio.currentTime = e.target.value
    if (!isPlay) {
      audio.play()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        background: '#eaf0fa',
        height: 48,
        width: 276,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 57px 0 19px'
      }}
    >
      <Typography>{duration}</Typography>
      <div
        id='play'
        style={{
          background: 'rgba(255, 255, 255, 1)',
          height: 24,
          width: 24,
          borderRadius: '50%',
          cursor: 'pointer',
          marginLeft: '12px'
        }}
        onClick={onPlayBtnClick}
      >
        {isPlay ? (
          <Pause sx={{ color: 'rgba(0, 44, 251, 1)' }} />
        ) : (
          <PlayArrow sx={{ color: 'rgba(0, 44, 251, 1)' }} />
        )}
      </div>
      <Slider
        sx={{
          color: 'rgba(173, 191, 223, 1)',
          width: '100%',
          borderRadius: '50px',
          margin: '0 8px 0 14px'
        }}
        size='small'
        value={progress}
        max={max}
        onChange={onSliderChange}
      />
      <Box sx={{ position: 'relative' }}>
        <Download
          sx={{
            cursor: 'pointer',
            color: 'rgba(173, 191, 223, 1)'
          }}
        />
        <a
          style={{
            position: 'absolute',
            left: 0,
            zIndex: 1,
            background: 'transparent',
            cursor: 'pointer',
            width: 24,
            height: 24
          }}
          href='public/test.mp3'
          download
        />
      </Box>
    </Box>
  )
}
