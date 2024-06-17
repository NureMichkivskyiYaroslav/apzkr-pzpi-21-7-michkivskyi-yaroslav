export interface ClientI {
    client: ClientInfo
    trips: Trip[]
}

interface ClientInfo {
    _id: string
    login: string
    password: string
    name: string
    phone: string
    __v: number
}

interface Trip {
    _id:string
    status: string
    start: string
    finishPlan: string
    finishFact: string
}