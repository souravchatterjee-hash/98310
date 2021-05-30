import { Sessions } from "./sessions.model";
import { VaccineFees } from "./vaccine-fees.model";

export interface Centers {
    center_id: number,
    name: string,
    address: string,
    address_l: string,
    state_name: string,
    state_name_l: string,
    district_name: string,
    district_name_l: string,
    block_name: string,
    block_name_l: string,
    pincode: number,
    lat: number,
    long: number,
    from: Date,
    to: Date,
    fee_type: string,
    vaccineFee: VaccineFees[],
    sessions: Sessions[]
}