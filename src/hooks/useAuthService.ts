import { signInWithPopup } from 'firebase/auth'
import { useCallback } from 'react'
import { auth, fbProvider } from '../firebase/config'
import { addDocument, checkDocumentExists } from '../firebase/services'
import type { User } from '../types'

export const useAuthService = () => {
  const handleLogin = useCallback(async () => {
    try {
      const data = await signInWithPopup(auth, fbProvider)

      if (data) {
        const {
          providerId,
          user: { uid, email, displayName, photoURL }
        } = data

        const userData = {
          uid,
          email,
          displayName,
          photoURL,
          providerId: providerId ?? ''
        }

        const userExists = await checkDocumentExists<User>('users', 'uid', uid)

        if (!userExists) {
          await addDocument<User>('users', userData)
        }
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }, [])

  return { handleLogin }
}
