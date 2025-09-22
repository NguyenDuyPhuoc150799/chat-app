import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Avatar, AvatarGroup, Box, Button, Stack, styled, Typography } from '@mui/material'
import { Fragment, useEffect, useMemo, useRef } from 'react'
import { useFormContext, type SubmitHandler } from 'react-hook-form'
import { useAppContext } from '../../context/AppProvider'
import { useAuthContext } from '../../context/AuthProvider'
import { addDocument, uploadToCloudinary } from '../../firebase/services'
import useFireStore from '../../hooks/useFireStore'
import { messageDefaultValues, type MessageSchema } from '../../schemas/messageSchema'
import { type FileMessage, type Message } from '../../types'
import { stringAvatar } from '../../utils/avatarHelper'
import { MUITextField } from '../FormFields/MUITextField'
import MessageBox from './MessageBox'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})
const ChatWindow = () => {
  const { selectedRoom, members, setOpenInviteModal } = useAppContext()
  const {
    user: { uid, displayName, photoURL }
  } = useAuthContext()

  const { reset, handleSubmit } = useFormContext<MessageSchema>()
  const messageCondition = useMemo(() => {
    return selectedRoom?.id
      ? { fieldName: 'roomId', operator: '==' as const, compareValue: selectedRoom.id }
      : undefined
  }, [selectedRoom?.id])
  const messages = useFireStore<Message>({ collectionInput: 'messages', condition: messageCondition })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const renderMessages = (messages: Message[]) => {
    return (
      <>
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </>
    )
  }
  const handleSendMessage: SubmitHandler<MessageSchema> = (data) => {
    if (data.message === '') return
    const payload = { uid, displayName, photoURL, roomId: selectedRoom?.id, message: data.message }
    addDocument<Message>('messages', payload as Message)
    reset(messageDefaultValues)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !selectedRoom) return

    try {
      const fileUrl = await uploadToCloudinary(file)
      const fileMessage: FileMessage = {
        type: 'file',
        uid,
        displayName: displayName || '',
        photoURL: photoURL || '',
        roomId: selectedRoom.id as string,
        fileName: file.name,
        fileUrl,
        fileType: file.type
      }

      await addDocument<Message>('messages', fileMessage)
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }
  return (
    <Stack spacing={4} sx={{ p: 2, height: '100vh', boxSizing: 'border-box' }}>
      {selectedRoom ? (
        <Fragment>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '80px',
              alignItems: 'center',
              borderBottom: '1px solid #ccc',
              pb: 2
            }}
          >
            <Box>
              <Typography variant='h6'>{selectedRoom?.name}</Typography>
              <Typography variant='body2'>{selectedRoom?.description}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button variant='outlined' size='small' sx={{ mr: 2 }} onClick={() => setOpenInviteModal(true)}>
                Invite
              </Button>
              <AvatarGroup max={4}>
                {members.map((member) => (
                  <Avatar key={member.id} alt={member.displayName || ''} src={member.photoURL || ''}>
                    {!member.photoURL && member.displayName ? stringAvatar(member.displayName).children : ''}
                  </Avatar>
                ))}
              </AvatarGroup>
            </Box>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              height: 'calc(100vh - 80px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}
          >
            <Box sx={{ maxHeight: '100%', overflowY: 'auto', scrollBehavior: 'smooth' }}>
              {renderMessages(messages)}
            </Box>
            <Box sx={{ display: 'flex', mt: 2, gap: 1 }} component={'form'} onSubmit={handleSubmit(handleSendMessage)}>
              <MUITextField fullWidth variant='outlined' placeholder='Type your message...' name='message' />
              <Button variant='contained' type='submit'>
                Send
              </Button>

              <Button component='label' variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
                <VisuallyHiddenInput type='file' onChange={handleFileUpload} />
              </Button>
            </Box>
          </Box>
        </Fragment>
      ) : (
        <Typography variant='body1'>Select a room to start chatting.</Typography>
      )}
    </Stack>
  )
}

export default ChatWindow
