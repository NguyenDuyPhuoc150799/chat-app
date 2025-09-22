import { createContext, useContext, useMemo, useState } from 'react'
import useFireStore from '../hooks/useFireStore'
import type { Room, User } from '../types'
import { useAuthContext } from './AuthProvider'

interface AppContextType {
  rooms: Room[]
  selectedRoom: Room | null
  selectedRoomId: string
  setSelectedRoomId: (id: string) => void
  openAddRoomModal: boolean
  setOpenAddRoomModal: (open: boolean) => void
  openInviteModal: boolean
  setOpenInviteModal: (open: boolean) => void
  members: User[]
  listInviteMembers: User[]
}
const AppContext = createContext<AppContextType>({
  rooms: [],
  selectedRoom: null,
  selectedRoomId: '',
  setSelectedRoomId: () => {},
  openAddRoomModal: false,
  setOpenAddRoomModal: () => {},
  openInviteModal: false,
  setOpenInviteModal: () => {},
  members: [],
  listInviteMembers: []
})
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    user: { uid }
  } = useAuthContext()
  const [selectedRoomId, setSelectedRoomId] = useState('')
  const [openAddRoomModal, setOpenAddRoomModal] = useState(false)
  const [openInviteModal, setOpenInviteModal] = useState(false)

  const roomCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains' as const,
      compareValue: uid
    }
  }, [uid])
  const rooms = useFireStore<Room>({ collectionInput: 'rooms', condition: roomCondition })
  const selectedRoom = useMemo(() => rooms.find((room) => room.id === selectedRoomId) || null, [rooms, selectedRoomId])

  const memberCondition = useMemo(() => {
    const members = selectedRoom?.members || []
    // Only return condition if members array is not empty
    return members.length > 0
      ? {
          fieldName: 'uid',
          operator: 'in' as const,
          compareValue: members
        }
      : undefined
  }, [selectedRoom])

  const members = useFireStore<User>({
    collectionInput: 'users',
    condition: memberCondition
  })

  const listInviteMembersCondition = useMemo(() => {
    const members = selectedRoom?.members || []
    return members.length > 0
      ? {
          fieldName: 'uid',
          operator: 'not-in' as const,
          compareValue: members
        }
      : {
          fieldName: 'uid',
          operator: 'in' as const,
          compareValue: members
        }
  }, [selectedRoom])
  const listInviteMembers = useFireStore<User>({
    collectionInput: 'users',
    condition: listInviteMembersCondition
  })

  const value = useMemo(
    () => ({
      rooms,
      selectedRoomId,
      setSelectedRoomId,
      members,
      selectedRoom,
      openAddRoomModal,
      setOpenAddRoomModal,
      openInviteModal,
      setOpenInviteModal,
      listInviteMembers
    }),
    [rooms, selectedRoom, members, selectedRoomId, openAddRoomModal, openInviteModal, listInviteMembers]
  )
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export { AppProvider, useAppContext }
