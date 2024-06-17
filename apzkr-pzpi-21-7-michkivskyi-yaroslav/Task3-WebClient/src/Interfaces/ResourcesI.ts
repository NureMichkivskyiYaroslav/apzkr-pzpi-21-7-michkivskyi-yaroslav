export interface ResourcesI {
    cases: Case[]
    drivers: Driver[]
    fridges: Fridge[]
    clients: Client[]
}

export interface Case {
    _id: string
    capacity: string
    inventoryNumber: number
    __v: number
}

export interface Driver {
    _id: string
    phone: string
    name: string
    __v: number
}

export interface Fridge {
    location: Location
    _id: string
    inventoryNumber: string
    timestamp: string
    __v: number
}

export interface Location {
    type: string
    coordinates: number[]
}

export interface Client {
    _id: string
    login: string
    password: string
    name: string
    phone: string
    __v: number
}
