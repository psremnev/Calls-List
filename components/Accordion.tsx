import { List, ListItem, ListItemText } from '@mui/material'
import { useMemo } from 'react'
import { MokiService } from '../Services/MokiService'
import { Brightness1 } from '@mui/icons-material'

export function Accordion() {
  const service = useMemo(() => {
    return new MokiService()
  }, [])

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#091336',
        width: 240,
        height: '100%'
      }}
    >
      {service.getAccordionList().map((value) => {
        const { id, title, icon, active } = value
        const color = active
          ? 'rgba(255, 255, 255, 1)'
          : 'rgba(255, 255, 255, 0.6)'
        
        return (
          <ListItem
            key={id}
            sx={{
              display: 'flex',
              fontSize: 16,
              height: 52,
              cursor: 'pointer'
            }}
          >
            {active && (
              <div
                style={{
                  width: 3,
                  height: '100%',
                  backgroundColor: 'rgba(0, 44, 251, 1)'
                }}
              ></div>
            )}
            <div style={{ color }}>{icon}</div>
            <ListItemText sx={{ color }} primary={title} />
            {active && (
              <Brightness1
                sx={{
                  color: '#FFD500',
                  fontSize: 8,
                  boxShadow: '0px 3px 8px rgba(237, 218, 1, 0.5)'
                }}
              />
            )}
          </ListItem>
        )
      })}
    </List>
  )
}
