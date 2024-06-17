import {TripCaseI} from "./TripCaseI.ts";

export interface TripI {
    trip: Trip
    driver: Driver
    fridge: Fridge
    tripCasesInfo: TripCaseI[]
    client:Client
}

interface Trip {
    _id: string
    status: string
    start: string
    finishPlan: string
    finishFact?:string
    driverId: string
    clientId: string
    fridgeId: string
    __v: number
}

interface Driver {
    _id: string
    phone: string
    name: string
    __v: number
}

interface Fridge {
    location: Location
    _id: string
    inventoryNumber: string
    timestamp: string
    __v: number
}

interface Client {
    _id: string
    login: string
    password: string
    name: string
    phone: string
    __v: number
}

interface Location {
    type: string
    coordinates: number[]
}
