import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { messageDefaultValues, messageSchema, type MessageSchema } from '../schemas/messageSchema'

const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const method = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: messageDefaultValues,
    mode: 'all'
  })
  return <FormProvider {...method}>{children}</FormProvider>
}

export default MessageProvider
