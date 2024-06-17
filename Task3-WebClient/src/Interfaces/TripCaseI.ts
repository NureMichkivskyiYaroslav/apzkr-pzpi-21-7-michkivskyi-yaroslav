export interface TripCaseI {
    inventoryNumber: number
    filling: string
    maxTemperature: number
    tripCaseId: string
    caseId: string
    tripId: string
    status: string
    statistics: Statistics
}

interface Statistics {
    time0to5: number
    timeAbove5: number
    averageExceed: number
}