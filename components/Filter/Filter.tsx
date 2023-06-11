import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import { IFilter } from 'interfaces/IFilterConfig'
import { FilterItem } from './FilterItem'

function Filter(config: IFilter) {
  const [expanded, setExpanded] = useState(false)
  const [textValue, setTextValue] = useState(config.textValue)
  const [value, setValue] = useState(config.value)
  const [targetOpenFilter, setTargetOpenFilter] = useState(null)

  const openFilter = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setTargetOpenFilter(e.currentTarget)
    setExpanded(true)
  }

  const closeFilter = () => {
    setTargetOpenFilter(null)
    setExpanded(false)
  }

  const itemClick = (result) => {
    config.filterChanged && config.filterChanged(result)
    setValue(result.value)
    setTextValue(result.textValue)
    closeFilter()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(94, 119, 147, 1)',
        fontSize: 14,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          cursor: 'pointer',
          '&:hover': { color: 'rgba(0, 44, 251, 1)' }
        }}
      >
        <Typography
          sx={{ fontSize: 14 }}
          onClick={!!targetOpenFilter ? closeFilter : openFilter}
        >
          {textValue}
        </Typography>
        {expanded ? <ExpandLess /> : <ExpandMore />}
      </Box>
      <Menu
        anchorEl={targetOpenFilter}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={!!targetOpenFilter}
        onClose={closeFilter}
      >
        {config.items ? (
          <div>
            {config.items.map((item, index) => (
              <div key={index}>
                <FilterItem
                  name={config.name}
                  itemTemplate={config.itemTemplate}
                  item={item}
                  selected={value === item[config.idProperty]}
                  showSelectedMarker={config.showSelectedMarker}
                  clickCallback={itemClick}
                />
              </div>
            ))}
          </div>
        ) : (
          <span style={{ padding: '6px' }}>
            Filter Not Work Because Not Set Filter Items
          </span>
        )}
      </Menu>
    </Box>
  )
}

Filter.defaultProps = {
  idProperty: 'id',
  displayProperty: 'title'
}

export { Filter }
