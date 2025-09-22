import { Button, Stack } from '@mui/material'
import { useAppContext } from '../../context/AppProvider'
import RoomList from './RoomList'
import UserInfo from './UserInfo'

const Sidebar = () => {
  const { setOpenAddRoomModal } = useAppContext()

  return (
    <Stack sx={{ height: '100vh', borderRight: '1px solid #ccc', bgcolor: '#f5f5f5' }}>
      <UserInfo />
      <RoomList />
      <Button variant='contained' sx={{ m: 2 }} onClick={() => setOpenAddRoomModal(true)}>
        Add new room
      </Button>
    </Stack>
  )
}

export default Sidebar
