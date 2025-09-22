import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { roomDefaultValues, roomSchema, type RoomSchema } from '../schemas/roomSchema'

const RoomsProvider = ({ children }: { children: React.ReactNode }) => {
  const method = useForm<RoomSchema>({
    resolver: zodResolver(roomSchema),
    defaultValues: roomDefaultValues,
    mode: 'all'
  })
  return <FormProvider {...method}>{children}</FormProvider>
}

export default RoomsProvider
