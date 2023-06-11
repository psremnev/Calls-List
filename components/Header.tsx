import { Box } from '@mui/material'
import { Statistics } from './Statistics'
import { Search } from './Search'
import { PersonPhoto } from './PersonPhoto'
import { ExpandMore } from '@mui/icons-material'

export function Header() {
  const getCurrentDate = () => {
    let days = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота'
    ]
    const d = new Date()
    return `${days[d.getDay()]}, ${d.getDate()}`
  }

  const statisticsStyle = {
    marginRight: '56px'
  }

  return (
    <Box
      sx={{
        padding: '0 120px',
        minHeight: 64,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 1)',
        boxShadow: '0px 4px 5px #E9EDF3',
        color: 'rgba(137, 156, 177, 1)'
      }}
    >
      <span
        style={{
          fontSize: 15,
          color: 'rgba(137, 156, 177, 1)',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          marginRight: '8px',
          minWidth: 50
        }}
      >
        {getCurrentDate()}
      </span>
      <Box sx={{ display: 'flex' }}>
        <Statistics
          sx={statisticsStyle}
          title='Новые звонки'
          progressText='20 из 30 шт'
          color='rgba(0, 167, 117, 1)'
          progress={66}
        />
        <Statistics
          sx={statisticsStyle}
          title='Качество разговоров'
          progressText='40%'
          color='rgba(255, 184, 0, 1)'
          progress={40}
        />
        <Statistics
          title='Конверсия в заказ'
          progressText='67%'
          color='rgba(234, 26, 79, 1)'
          progress={67}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            marginLeft: 6,
            color: 'rgba(173, 191, 223, 1)',
            marginRight: '64px'
          }}
        >
          <Search reverse={true} />
        </div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          <span>Иванов Иван</span>
          <ExpandMore />
        </Box>
        <PersonPhoto />
      </Box>
    </Box>
  )
}
