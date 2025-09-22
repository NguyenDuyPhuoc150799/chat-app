import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../firebase/config'

type AuthState = {
  user: {
    uid: string
    email?: string | null
    displayName?: string | null
    photoURL?: string | null
  }
}
const AuthContext = createContext<AuthState>({
  user: {
    uid: '',
    email: null,
    displayName: null,
    photoURL: null
  }
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({} as AuthState['user'])
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user
        setUser({ uid, email, displayName, photoURL })
        navigate('/')
        return
      }
      setUser({
        uid: '',
        email: null,
        displayName: null,
        photoURL: null
      })
      navigate('/login')
    })
    return () => unsubscribe()
  }, [navigate])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuthContext }
