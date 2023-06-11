import { Brightness1 } from '@mui/icons-material'
import { MenuItem, Typography } from '@mui/material'
import { IFilterItem } from 'interfaces/IFilterConfig'

export function FilterItem({
  name,
  itemTemplate,
  item,
  idProperty = 'id',
  displayProperty = 'title',
  selected,
  showSelectedMarker = false,
  clickCallback
}: IFilterItem) {
  const ItemTemplate = itemTemplate

  return (
    <MenuItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(94, 119, 147, 1)',
        fontSize: 14
      }}
      selected={selected}
      onClick={() =>
        clickCallback({
          name,
          value: item[idProperty],
          textValue: item[displayProperty]
        })
      }
    >
      {ItemTemplate ? (
        <ItemTemplate item={item} />
      ) : (
        <Typography textAlign='center'>{item[displayProperty]}</Typography>
      )}
      {selected && showSelectedMarker && (
        <Brightness1
          sx={{
            color: '#FFD500',
            fontSize: 8,
            boxShadow: '0px 3px 8px rgba(237, 218, 1, 0.5)'
          }}
        />
      )}
    </MenuItem>
  )
}
