import { Close, Search as SearchIcon } from '@mui/icons-material'
import { Box, TextField } from '@mui/material'
import { useState } from 'react'

export function Search({
  callback,
  reverse
}: {
  callback?: Function
  reverse?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const [searchString, setSearchString] = useState('')

  const searchValueChanged = (e) => {
    setSearchString(e.target.value)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: 16,
        height: 16,
        color: 'rgba(94, 119, 147, 1)',
        fontSize: 14,
        position: 'relative',
        flexDirection: reverse ? 'row-reverse' : 'row'
      }}
    >
      {!expanded && (
        <SearchIcon
          sx={{
            cursor: 'pointer',
            width: 16,
            height: 16,
            color: 'rgba(173, 191, 223, 1)',
            '&:hover': { color: 'rgba(0, 44, 251, 1)' }
          }}
          onClick={() => setExpanded(!expanded)}
        />
      )}

      {expanded && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 1,
            height: 40,
            width: 482,
            padding: '0px 18px',
            borderRadius: '48px',
            border: '1px solid rgba(0, 44, 251, 1)',
            background: 'white'
          }}
        >
          <SearchIcon
            sx={{
              cursor: 'pointer',
              width: 16,
              height: 16
            }}
            onClick={() => callback && callback(searchString)}
          />
          <input
            style={{
              outline: 'none',
              borderRadius: '48px',
              border: 'none',
              padding: '6px',
              width: '100%'
            }}
            value={searchString}
            id='site-search'
            placeholder='Find...'
            onChange={searchValueChanged}
          />
          <Close
            sx={{ cursor: 'pointer', width: 16, height: 16 }}
            onClick={() => setExpanded(!expanded)}
          />
        </Box>
      )}
    </Box>
  )
}
