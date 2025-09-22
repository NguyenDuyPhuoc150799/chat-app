import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { inviteSchema, type InviteSchema } from '../schemas/inviteSchema'

const InviteProvider = ({ children }: { children: React.ReactNode }) => {
  const method = useForm<InviteSchema>({
    resolver: zodResolver(inviteSchema),
    defaultValues: inviteSchema.parse({ members: [] }),
    mode: 'all'
  })
  return <FormProvider {...method}>{children}</FormProvider>
}

export default InviteProvider
