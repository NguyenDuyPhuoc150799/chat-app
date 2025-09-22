import type { DocumentData, Timestamp } from 'firebase/firestore'

interface Room extends DocumentData {
  id?: string
  name: string
  description: string
  members: string[]
  createdAt?: Timestamp
}

interface User extends DocumentData {
  id?: string
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  providerId: string
  createdAt?: Timestamp
}

interface BaseMessage extends DocumentData {
  id?: string
  roomId: string
  uid: string
  displayName: string | null
  photoURL: string | null
  createdAt?: Timestamp
}

export interface TextMessage extends BaseMessage {
  type: 'text'
  message: string
}

export interface FileMessage extends BaseMessage {
  type: 'file'
  fileName: string
  fileUrl: string
  fileType: string
}

type Message = TextMessage | FileMessage

export type { Room, User, Message }
