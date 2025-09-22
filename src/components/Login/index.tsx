import { Button, Container } from '@mui/material'
import { useAuthService } from '../../hooks/useAuthService'

const Login = () => {
  const { handleLogin } = useAuthService()

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Button variant='contained' onClick={handleLogin}>
        Login With Facebook
      </Button>
    </Container>
  )
}

export default Login
