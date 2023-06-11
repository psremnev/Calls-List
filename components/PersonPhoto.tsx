import { ExpandMore } from '@mui/icons-material'
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { PartnerService } from '../Services/PartnerService'
import { Error } from './Error'

export function PersonPhoto() {
  const [menu, setMenu] = useState(null)
  const [error, setError] = useState(null)
  const [avatarElement, setAvatarElement] = useState<null | HTMLElement>(null)
  const partnerService = useMemo(() => {
    return new PartnerService()
  }, [])

  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setAvatarElement(event.currentTarget)
  }

  const closeMenu = () => {
    setAvatarElement(null)
  }

  useEffect(() => {
    Promise.all([partnerService.getMenu()])
      .then(([menuData]) => {
        setMenu(menuData)
      })
      .catch(setError)
  }, [])

  return (
    <>
      {error ? (
        <Error message={error.message} />
      ) : (
        <Box>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={openUserMenu}
          >
            <Avatar alt='Иванов Иван' src='public/avatar.png' />
            <ExpandMore />
          </Box>
          <Menu
            sx={{ mt: '45px' }}
            anchorEl={avatarElement}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={!!avatarElement}
            onClose={closeMenu}
          >
            {menu &&
              menu.map((item, index) => (
                <MenuItem key={index}>
                  <Typography textAlign='center'>{item.name}</Typography>
                </MenuItem>
              ))}
          </Menu>
        </Box>
      )}
    </>
  )
}
