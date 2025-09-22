import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { useState } from 'react'

import { useAppContext } from '../../context/AppProvider'
const RoomList = () => {
  const [open, setOpen] = useState(false)
  const { selectedRoomId, setSelectedRoomId, rooms } = useAppContext()

  return (
    <List sx={{ bgcolor: '#e0e0e0' }} component='nav' aria-labelledby='nested-list-subheader'>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary='Room List' />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {rooms.map((room) => (
            <ListItemButton
              key={room.id}
              sx={{ pl: 4 }}
              selected={room.id === selectedRoomId}
              onClick={() => setSelectedRoomId(room.id!)}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={room.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  )
}

export default RoomList
