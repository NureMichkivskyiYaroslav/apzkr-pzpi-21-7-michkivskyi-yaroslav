export interface DriverI {
    driver: DriverInfo
    trips: Trip[]
}

interface DriverInfo {
    _id: string
    phone: string
    name: string
    __v: number
}

interface Trip {
    _id: string
    status: string
    start: string
    finishPlan: string
    driverId: string
    clientId: string
    fridgeId: string
    __v: number
    finishFact?: string
}