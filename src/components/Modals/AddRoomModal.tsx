import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useFormContext, type SubmitHandler } from 'react-hook-form'
import { useAppContext } from '../../context/AppProvider'
import { useAuthContext } from '../../context/AuthProvider'
import { addDocument } from '../../firebase/services'
import { roomDefaultValues, type RoomSchema } from '../../schemas/roomSchema'
import { type Room } from '../../types'
import { MUITextField } from '../FormFields/MUITextField'

const AddRoomModal = () => {
  const { openAddRoomModal, setOpenAddRoomModal } = useAppContext()
  const {
    user: { uid }
  } = useAuthContext()

  const { reset, handleSubmit } = useFormContext<RoomSchema>()
  const handleCreateRoom: SubmitHandler<RoomSchema> = async (data) => {
    try {
      setOpenAddRoomModal(false)
      reset(roomDefaultValues)
      await addDocument<Room>('rooms', {
        ...data,
        members: [uid]
      })
    } catch (error) {
      console.error('Error creating room:', error)
    }
  }

  const handleOnClose = () => {
    setOpenAddRoomModal(false)
    reset(roomDefaultValues)
  }

  return (
    <Modal
      open={openAddRoomModal}
      onClose={handleOnClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        component='form'
        onSubmit={handleSubmit(handleCreateRoom)}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>
          <Typography id='modal-modal-title' variant='h6' component='h2' alignSelf={'center'} alignContent={'center'}>
            Add New Room
          </Typography>
          <MUITextField name='name' label='Room Name' />
          <MUITextField name='description' label='Description' />
          <Button variant='contained' color='primary' fullWidth type='submit'>
            Create Room
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default AddRoomModal
