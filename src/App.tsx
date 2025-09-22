import { BrowserRouter, Route, Routes } from 'react-router'
import ChatRoom from './components/ChatRoom'
import Login from './components/Login'
import AddRoomModal from './components/Modals/AddRoomModal'
import InviteModal from './components/Modals/InviteModal'
import { AppProvider } from './context/AppProvider'
import { AuthProvider } from './context/AuthProvider'
import InviteProvider from './context/InviteProvider'
import RoomsProvider from './context/RoomsProvider'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<ChatRoom />} />
          </Routes>
          <RoomsProvider>
            <AddRoomModal />
          </RoomsProvider>
          <InviteProvider>
            <InviteModal />
          </InviteProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
