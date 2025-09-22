import { z } from 'zod'

export const roomSchema = z.object({
  name: z.string().min(1, { message: 'Room name is required' }),
  description: z.string().min(1, { message: 'Room description is required' })
})

export type RoomSchema = z.infer<typeof roomSchema>

export const roomDefaultValues: RoomSchema = { name: '', description: '' }
