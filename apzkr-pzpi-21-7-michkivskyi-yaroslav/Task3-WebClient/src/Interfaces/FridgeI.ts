import {TripShortI} from "./TripShortI.ts";

export interface FridgeI {
    fridge: FridgeInfo
    trips: TripShortI[]
}

interface FridgeInfo {
    location: Location
    _id: string
    inventoryNumber: string
    timestamp: string
    __v: number
}

interface Location {
    type: string
    coordinates: number[]
}