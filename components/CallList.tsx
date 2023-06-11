import {
  Avatar,
  Box,
  Checkbox,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CallService } from '../Services/CallService'
import { CallMade, CallReceived } from '@mui/icons-material'
import { CallType, CallStatus } from '../enums'
import { Error } from './Error'
import { Rate } from './Rate'
import { RATE_TYPE } from '../enums'
import { AudioPlayer } from './AudioPlayer'
import moment from 'moment'
import { CallListHeader } from './CallListHeader'
import { getFormatDate } from '../utils/getFormatDate'
import { getFormatDateValue } from '../utils/getFormatDateValue'
import { getDuration } from '../utils/getDuration'

export function CallList() {
  const callService = useMemo(() => {
    return new CallService()
  }, [])
  const [error, setError] = useState(null)
  const [items, setItems] = useState(null)
  const [isLoad, setIsLoad] = useState(false)
  const [rowHoverId, setRowHoverId] = useState(null)
  const hasMore = useRef(true)
  const pageSize = 50

  useEffect(() => {
    setIsLoad(true)
    callService
      .getCallsList(['2022-08-01', getFormatDate(new Date())])
      .then((loadData) => {
        setItems(getItemsFromLoadData(loadData))
      })
      .catch(setError)
      .finally(() => setIsLoad(false))
  }, [])

  const getTime = (date: string): string => {
    const d = new Date(date)
    return `${d.getHours()}:${getFormatDateValue(d.getMinutes())}`
  }

  const getLastDate = (items: { id: string; date_notime: string }[]) => {
    for (let i = 0; i <= items.length; i++) {
      const item = items[i]
      if (item.id) {
        return item.date_notime
      }
    }
  }

  const updateList = (filter: {
    searchString: string
    in_out: number | null
    date: string
  }) => {
    const defaultFilter = {
      searchString: '',
      in_out: null,
      date: ['2022-08-01', '2023-06-01']
    }
    const newilter = { ...defaultFilter, ...filter }
    const { searchString, in_out, date } = newilter

    callService
      .getCallsList(date, in_out, searchString)
      .then((loadData) => {
        setItems(getItemsFromLoadData(loadData))
      })
      .catch(setError)
  }

  const getItemsFromLoadData = (loadData: { date_notime?: string }[]) => {
    const obj = {}
    loadData.forEach((el) => {
      const isTitle = !el.date_notime
      if (isTitle) return
      const item = obj[el.date_notime]
      if (item) {
        item.push(el)
      } else {
        obj[el.date_notime] = [el]
      }
    })

    let res = []
    for (let key in obj) {
      const data = obj[key]
      res.push({ title: key, count: data.length })
      data.forEach((row) => res.push(row))
    }
    return res
  }

  const sortByDate = (loadData: { date_notime: string }[]) => {
    return loadData.sort((one, two) => {
      const dataOne = new Date(one.date_notime)
      const dataTwo = new Date(two.date_notime)
      if (dataOne === dataTwo) return 0
      else if (dataOne > new Date(two.date_notime)) return 1
      else return -1
    })
  }

  const headers = [
    { id: 0, type: 'checkbox' },
    { id: 1, title: 'Тип' },
    { id: 2, title: 'Время' },
    { id: 3, title: 'Сотрудник' },
    { id: 4, title: 'Звонок' },
    { id: 5, title: 'Источник' },
    { id: 6, title: 'Оценка' },
    { id: 7, title: 'Длительность' }
  ]

  const getIconStyle = (status: boolean) => {
    return {
      width: 12,
      height: 12,
      color: status ? 'rgba(40, 168, 121, 1)' : 'rgba(234, 26, 79, 1)'
    }
  }

  const onScroll = async (e) => {
    const offset = 200
    const needLoad =
      e.target.scrollTop + e.target.scrollWidth > e.target.scrollHeight - offset
    if (needLoad && hasMore.current && !isLoad) {
      setIsLoad(true)
      const lastDate = getLastDate(items)
      const loadData = await callService.getCallsList([
        lastDate,
        getFormatDate(new Date())
      ])
      hasMore.current = loadData.length === pageSize
      const newData = [...loadData, ...items.slice()]
      setItems(getItemsFromLoadData(newData))
      setIsLoad(false)
    }
  }

  const getRateType = (status: boolean, time) => {
    if (status) {
      if (time > 60) {
        return RATE_TYPE.GREAT
      }
      return RATE_TYPE.GOOD
    }
    return RATE_TYPE.BAD
  }

  const getGroupDate = (date: string) => {
    moment.locale('ru')
    const d = new Date(date)
    const m = moment([d.getFullYear(), d.getMonth(), d.getDate()]).fromNow()
    return `${m}`
  }

  return (
    <>
      {error ? (
        <Error message={error.message} />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: '120px',
            overflow: 'hidden',
            height: '100%',
            minHeight: 600
          }}
        >
          <CallListHeader callback={updateList} />
          <Grid container sx={{ overflow: 'hidden' }}>
            <Grid
              item
              xs={8}
              sm={12}
              columns={headers.length}
              sx={{ height: '100%' }}
            >
              <TableContainer
                component={Paper}
                onScroll={onScroll}
                sx={{
                  background: '#FFFFFF',
                  boxShadow: '0px 4px 5px #E9EDF3',
                  borderRadius: '8px',
                  width: '100%',
                  marginTop: '20px',
                  height: 'calc(100% - 20px)'
                }}
              >
                <Table stickyHeader sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header, index) => (
                        <TableCell
                          padding={
                            header.type === 'checkbox' ? 'checkbox' : 'normal'
                          }
                          sx={{
                            textAlign: 'center',
                            color: 'rgba(137, 156, 177, 1)',
                            fontSize: 14
                          }}
                          key={index}
                        >
                          {header.type === 'checkbox' ? (
                            <>
                              {rowHoverId ? (
                                <Checkbox
                                  color='primary'
                                  sx={{
                                    '&:hover': {
                                      backgroundColor: 'rgba(0, 44, 251, 1))'
                                    },
                                    color: 'rgba(173, 191, 223, 1)'
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            <span>{header.title}</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items && items?.length ? (
                      items.map((value, index) => {
                        const {
                          id,
                          title,
                          count,
                          in_out,
                          date,
                          partner_data,
                          source,
                          time,
                          person_avatar,
                          status,
                          person_name,
                          person_surname,
                          partnership_id
                        } = value

                        const notTitle = !title
                        const statusIsTrue = status === CallStatus.TRUE
                        const iconStyle = getIconStyle(statusIsTrue)
                        const duration = getDuration(time)
                        const isHover = rowHoverId === id

                        return (
                          <TableRow
                            hover
                            tabIndex={-1}
                            key={index}
                            onMouseEnter={() => setRowHoverId(id)}
                            onMouseLeave={() => setRowHoverId(null)}
                            sx={{
                              fontSize: 15,
                              '&:hover': {
                                backgroundColor:
                                  'rgba(212, 223, 243, 0.17) !important'
                              }
                            }}
                          >
                            {title && (
                              <TableCell
                                sx={{
                                  position: 'sticky',
                                  top: '56px',
                                  background: 'rgba(255, 255, 255, 1)',
                                  zIndex: 1
                                }}
                                colSpan={headers.length}
                              >
                                <span>
                                  <span
                                    style={{
                                      color: 'rgba(18, 41, 69, 1)',
                                      fontSize: 15
                                    }}
                                  >
                                    {getGroupDate(title)}{' '}
                                  </span>
                                  <span
                                    style={{
                                      color: 'rgba(137, 156, 177, 1)',
                                      verticalAlign: 'super'
                                    }}
                                  >
                                    {count}
                                  </span>
                                </span>
                              </TableCell>
                            )}
                            {notTitle && (
                              <TableCell padding='checkbox'>
                                {isHover ? (
                                  <Checkbox
                                    color='primary'
                                    sx={{
                                      color: isHover
                                        ? 'rgba(0, 44, 251, 1)'
                                        : 'rgba(173, 191, 223, 1)'
                                    }}
                                  />
                                ) : (
                                  <div style={{ width: 46 }}></div>
                                )}
                              </TableCell>
                            )}
                            {notTitle && (
                              <TableCell align='center'>
                                {in_out === CallType.INCOMING ? (
                                  <CallReceived sx={iconStyle} />
                                ) : (
                                  <CallMade sx={iconStyle} />
                                )}
                              </TableCell>
                            )}
                            {notTitle && (
                              <TableCell align='center'>
                                {getTime(date)}
                              </TableCell>
                            )}
                            {notTitle && (
                              <TableCell>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Avatar
                                    alt={`${person_name} ${person_surname}`}
                                    src={person_avatar}
                                  />
                                </Box>
                              </TableCell>
                            )}
                            {notTitle && (
                              <TableCell
                                align='center'
                                sx={{
                                  color: CallStatus.TRUE
                                    ? 'rgba(18, 41, 69, 1)'
                                    : 'rgba(94, 119, 147, 1)'
                                }}
                              >
                                <span
                                  style={{
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden'
                                  }}
                                >{`+${partner_data.phone}`}</span>
                              </TableCell>
                            )}

                            {notTitle && (
                              <TableCell align='center'>{source}</TableCell>
                            )}
                            {notTitle && (
                              <TableCell>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Rate
                                    type={getRateType(statusIsTrue, time)}
                                  />
                                </Box>
                              </TableCell>
                            )}
                            {notTitle && (
                              <TableCell
                                align='center'
                                sx={{
                                  minWidth: 400,
                                  padding: '0 20px'
                                }}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'flex-end'
                                  }}
                                >
                                  {isHover ? (
                                    <AudioPlayer />
                                  ) : (
                                    <span>{duration}</span>
                                  )}
                                </Box>
                              </TableCell>
                            )}
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          sx={{ textAlign: 'center' }}
                          colSpan={headers.length}
                        >
                          {isLoad ? (
                            <CircularProgress />
                          ) : (
                            <Typography>Empty List</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )
}
