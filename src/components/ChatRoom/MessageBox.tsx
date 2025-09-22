import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { Avatar, Box, Link, Typography } from '@mui/material'
import type { Message } from '../../types'
import formatDate from '../../utils/formatDate'

type MessageBoxProps = {
  message: Message
}

const MessageBox = ({ message }: MessageBoxProps) => {
  const renderMessageContent = () => {
    if (message.type === 'file') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FileDownloadIcon />
          <Link href={message.fileUrl} target='_blank' rel='noopener noreferrer'>
            {message.fileName}
          </Link>
        </Box>
      )
    }
    return <Typography variant='body1'>{message.message}</Typography>
  }

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar src={message.photoURL || ''} alt={message.displayName || 'User Avatar'} sx={{ mr: 2 }} />
        <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mr: 2 }}>
          {message.displayName || 'Username'}
        </Typography>
        <Typography variant='caption' color='textSecondary'>
          {formatDate(message.createdAt?.seconds)}
        </Typography>
      </Box>
      <Box sx={{ mb: 2, p: 2, bgcolor: '#f0f0f0', borderRadius: '8px', maxWidth: '100%' }}>
        {renderMessageContent()}
      </Box>
    </div>
  )
}

export default MessageBox
