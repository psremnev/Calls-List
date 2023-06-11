import { Box } from '@mui/material'
import { useMemo, useState } from 'react'
import { CallService } from 'Services/CallService'
import { DateSelector } from './DateSelector'
import { Filter } from './Filter/Filter'
import { Search } from './Search'

export function CallListHeader({ callback }: { callback: Function }) {
  const [selected, setSelected] = useState({})

  const onFilterChanged = (result) => {
    const { name, value, textValue } = result
    if (callback) {
      switch (name) {
        case 'in_out':
          callback({ in_out: value })
          selected[name] = { value, textValue }
      }
    }
  }

  const searchCallback = (searchString: string) => {
    callback && callback({ searchString })
  }

  const [filters, setFilters] = useState([
    {
      name: 'in_out',
      value: selected['in_out']?.value || null,
      textValue: selected['in_out']?.textValue || 'Все типы',
      defaultValue: null,
      items: [
        { id: null, title: 'Все типы' },
        { id: 1, title: 'Входящие' },
        { id: 0, title: 'Исходящие' }
      ],
      filterChanged: onFilterChanged
    },
    {
      name: 'employees',
      textValue: 'Все сотрудники'
    },
    {
      name: 'calls',
      textValue: 'Все звонки'
    },
    {
      name: 'sources',
      textValue: 'Все источники'
    },
    {
      name: 'rates',
      textValue: 'Все оценки'
    },
    {
      name: 'errors',
      textValue: 'Все ошибки'
    }
  ])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '45px',
          width: '100%'
        }}
      >
        <DateSelector callback={callback} />
      </div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Search callback={searchCallback} />
          <span
            style={{
              marginLeft: 12,
              color: 'rgba(94, 119, 147, 1)',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            }}
          >
            Поиск по звонкам
          </span>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {filters.map((config, index) => {
            return (
              <div style={{ marginLeft: 36 }} key={index}>
                <Filter {...config} />
              </div>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
