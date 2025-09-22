import { Button } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useAppContext } from '../../context/AppProvider'

import { doc, updateDoc } from 'firebase/firestore'
import { useMemo } from 'react'
import { useFormContext, type SubmitHandler } from 'react-hook-form'
import { db } from '../../firebase/config'
import { inviteDefaultValues, type InviteSchema } from '../../schemas/inviteSchema'
import { MUIAutocomplete, type Option } from '../FormFields/MUIAutocomplete'

const InviteModal = () => {
  const { openInviteModal, setOpenInviteModal, listInviteMembers, selectedRoomId, selectedRoom } = useAppContext()
  const options: Option[] = useMemo(
    () => listInviteMembers.map((member) => ({ id: member.uid, label: member.displayName ?? '' })) || [],
    [listInviteMembers]
  )
  const { reset, handleSubmit } = useFormContext<InviteSchema>()

  const handleInvite: SubmitHandler<InviteSchema> = async (data) => {
    try {
      reset(inviteDefaultValues)
      setOpenInviteModal(false)
      const docRef = doc(db, 'rooms', selectedRoomId)
      if (selectedRoom?.members) {
        await updateDoc(docRef, {
          members: [...selectedRoom.members, ...data.members]
        })
      }
    } catch (error) {
      console.error('Error inviting member:', error)
    }
  }

  return (
    <Modal
      open={openInviteModal}
      onClose={() => setOpenInviteModal(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}
        component='form'
        onSubmit={handleSubmit(handleInvite)}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>
          <Typography id='modal-modal-title' variant='h6' component='h2' alignSelf={'center'} alignContent={'center'}>
            Invite
          </Typography>
          <MUIAutocomplete name='members' label='Members' options={options} />

          <Button variant='contained' color='primary' fullWidth type='submit'>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default InviteModal
