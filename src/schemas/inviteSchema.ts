import { z } from 'zod'

export const inviteSchema = z.object({
  members: z.array(z.string())
})

export type InviteSchema = z.infer<typeof inviteSchema>

export const inviteDefaultValues: InviteSchema = { members: [] }
