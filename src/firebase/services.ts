import axios from 'axios'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from './config'

export const addDocument = async <T>(collectionName: string, data: T): Promise<T> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp()
    })
    return { ...data, id: docRef.id, createdAt: serverTimestamp() } as T
  } catch (error) {
    console.error('Error adding document:', error)
    throw error
  }
}

export const checkDocumentExists = async <T>(
  collectionName: string,
  field: keyof T,
  value: T[keyof T]
): Promise<boolean> => {
  const q = query(collection(db, collectionName), where(field as string, '==', value))
  const querySnapshot = await getDocs(q)
  return !querySnapshot.empty
}

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`
export const uploadToCloudinary = async (file: File): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    const response = await axios.post(CLOUDINARY_API_URL, formData)
    return response.data.secure_url
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error
  }
}
