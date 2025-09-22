import { z } from 'zod'

export const messageSchema = z.object({
  message: z.string()
})

export type MessageSchema = z.infer<typeof messageSchema>

export const messageDefaultValues: MessageSchema = { message: '' }
