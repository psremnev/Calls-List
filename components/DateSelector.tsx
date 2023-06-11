import {
  CalendarToday,
  ChevronLeft,
  ChevronRight,
  CheckCircleOutline
} from '@mui/icons-material'
import { Box, Menu, MenuItem, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ru'
import {
  DateRangePicker,
  SingleInputDateRangeField
} from '@mui/x-date-pickers-pro'
import { getFormatDate } from '../utils/getFormatDate'

const dateItems = [
  { type: 'days', title: '3 дня' },
  { type: 'week', title: 'Неделя' },
  { type: 'month', title: 'Месяц' },
  { type: 'year', title: 'Год' },
  { type: 'custom', title: 'Указать даты' }
]

export function DateSelector({ callback }) {
  const [interval, setInterval] = useState(dateItems[0])
  const [targetOpen, setTargetOpen] = useState(null)
  const [customDate, setCustomDate] = useState()

  const open = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setTargetOpen(e.currentTarget)
  }

  const close = () => {
    setTargetOpen(null)
  }

  const onMenuClick = (item) => {
    if (item.type !== 'custom') {
      setInterval(item)
      callback && callback({ date: getFormatDateByRangeType(item.type) })
      close()
    }
  }

  const getFormatDateCustom = (date) => {
    return `${date.year()}-${date.month()}-${date.date()}`
  }

  const getFormatDateByDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  const onDateChanged = (dateRange) => {
    const [first, second] = dateRange
    setCustomDate([getFormatDateCustom(first), getFormatDateCustom(second)])
  }

  const applyCustomRange = (customDate) => {
    const [first, second] = customDate
    setInterval({ type: 'custom', title: `${first}-${second}` })
    callback && callback({ date: customDate })
    close()
  }

  const getDateByOffset = (days, date = new Date(), forward = false) => {
    const day = date.getDate()
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      forward ? day + days : day - days
    )
  }

  const getFormatDateByRangeType = (type) => {
    const now = new Date()
    switch (type) {
      case 'days':
        return [getFormatDate(getDateByOffset(3)), getFormatDate(now)]
      case 'week':
        return [getFormatDate(getDateByOffset(7)), getFormatDate(now)]
      case 'month':
        return [getFormatDate(getDateByOffset(30)), getFormatDate(now)]
      case 'year':
        return [getFormatDate(getDateByOffset(365)), getFormatDate(now)]
    }
  }

  const onPaginationClick = (forward = true, offset = 3) => {
    const dateRangeByInterval =
      interval.type === 'custom'
        ? customDate
        : getFormatDateByRangeType(interval.type)

    const dateRange = [
      getDateByOffset(offset, new Date(dateRangeByInterval[0]), forward),
      getDateByOffset(offset, new Date(dateRangeByInterval[1]), forward)
    ]
    const newCustomDate = [
      getFormatDateByDate(dateRange[0]),
      getFormatDateByDate(dateRange[1])
    ]
    applyCustomRange(newCustomDate)
    setCustomDate(newCustomDate)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(173, 191, 223, 1)'
      }}
    >
      <ChevronLeft
        sx={{
          marginRight: '21px',
          '&:hover': { color: 'rgba(0, 44, 251, 1)' },
          cursor: 'pointer'
        }}
        onClick={() => onPaginationClick()}
      />
      <Box sx={{ display: 'flex' }} onClick={open}>
        <CalendarToday
          sx={{
            width: 16,
            height: 16,
            marginRight: '8px',
            '&:hover': { color: 'rgba(0, 44, 251, 1)' },
            cursor: 'pointer'
          }}
        />
        <Typography
          style={{
            cursor: 'pointer',
            color: 'rgba(0, 95, 248, 1)',
            fontSize: 14
          }}
        >
          {interval.title}
        </Typography>
      </Box>
      <ChevronRight
        sx={{
          marginLeft: '21px',
          '&:hover': { color: 'rgba(0, 44, 251, 1)' },
          cursor: 'pointer'
        }}
        onClick={() => onPaginationClick(true)}
      />
      <Menu
        MenuListProps={{ sx: { paddingBottom: 0, paddingTop: 0 } }}
        anchorEl={targetOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={!!targetOpen}
        onClose={close}
      >
        {dateItems.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color:
                item.type === interval.type
                  ? 'rgba(0, 44, 251, 1)'
                  : 'rgba(94, 119, 147, 1)',
              fontSize: 14,
              '&:hover': { background: 'rgb(222,228,255)' }
            }}
            onClick={() => onMenuClick(item)}
          >
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0px'
                }}
              >
                <Typography>{item.title}</Typography>
                {item.type === 'custom' && customDate ? (
                  <CheckCircleOutline
                    sx={{ '&:hover': { color: 'rgba(0, 44, 251, 1)' } }}
                    onClick={() => applyCustomRange(customDate)}
                  />
                ) : (
                  <></>
                )}
              </Box>
              {item.type === 'custom' ? (
                <Box>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale='ru'
                  >
                    <DateRangePicker
                      slots={{ field: SingleInputDateRangeField }}
                      label='____-__-__ - ____-__-__'
                      onChange={onDateChanged}
                    />
                  </LocalizationProvider>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
