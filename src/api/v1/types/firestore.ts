export type FirestoreDataTypes =
    | string
    | number
    | boolean
    | null
    | Date
    | FirestoreDataTypes[]
    | { [key: string]: FirestoreDataTypes };