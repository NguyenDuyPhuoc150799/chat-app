import { Grid } from '@mui/material'
import MessageProvider from '../../context/MessageProvider'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'

const ChatRoom = () => {
  return (
    <Grid container>
      <Grid size={4}>
        <Sidebar />
      </Grid>
      <Grid size={8}>
        <MessageProvider>
          <ChatWindow />
        </MessageProvider>
      </Grid>
    </Grid>
  )
}

export default ChatRoom
