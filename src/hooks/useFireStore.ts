import { collection, onSnapshot, orderBy, query, Query, where, type DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase/config'

export type FirestoreConfig = {
  collectionInput: string
  condition?: {
    fieldName: string
    operator: '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in'
    compareValue: string | number | boolean | string[]
  }
}

const useFireStore = <T extends DocumentData>({ collectionInput, condition }: FirestoreConfig): T[] => {
  const [documents, setDocuments] = useState<T[]>([])
  useEffect(() => {
    const collectionRef = collection(db, collectionInput)

    if (
      condition?.compareValue instanceof Array &&
      condition.compareValue.length === 0 &&
      (condition.operator === 'in' || condition.operator === 'not-in')
    ) {
      setDocuments([])
      return
    }

    let queryRef: Query = collectionRef

    if (condition?.fieldName && condition.operator && condition.compareValue) {
      queryRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue),
        orderBy('createdAt', 'asc')
      )
    }

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })) as unknown as T[]

      setDocuments(docs)
    })
    return () => unsubscribe()
  }, [collectionInput, condition])
  return documents
}

export default useFireStore
