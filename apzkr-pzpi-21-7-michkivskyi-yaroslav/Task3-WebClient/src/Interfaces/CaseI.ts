import {TripCaseI} from "./TripCaseI.ts";

export interface CaseI {
    case: CaseInfo
    tripCasesInfo: TripCaseI[]
}

interface CaseInfo {
    _id: string
    capacity: string
    inventoryNumber: number
    __v: number
}
