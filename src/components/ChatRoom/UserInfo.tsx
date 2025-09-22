import { Avatar, Box, Button, Typography } from '@mui/material'
import { useAuthContext } from '../../context/AuthProvider'
import { auth } from '../../firebase/config'
import { stringAvatar } from '../../utils/avatarHelper'
const UserInfo = () => {
  const {
    user: { displayName, photoURL }
  } = useAuthContext()

  const handleLogout = () => {
    auth.signOut().catch((error) => {
      console.error('Error during sign-out:', error)
    })
  }
  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ccc',
        bgcolor: '#e0e0e0',
        height: '80px'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={displayName ?? ''} src={photoURL ?? ''}>
          {!photoURL && displayName ? stringAvatar(displayName).children : ''}
        </Avatar>
        <Typography variant='h6' sx={{ ml: 2 }}>
          {displayName}
        </Typography>
      </Box>
      <Button variant='outlined' size='small' onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  )
}

export default UserInfo
