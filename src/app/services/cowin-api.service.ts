import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class CowinApiService {

    constructor(private http: HttpClient) { }

    getStates() : Promise<any> {
        return this.http.get('https://cdn-api.co-vin.in/api/v2/admin/location/states').toPromise();
    }

    getDistricts(stateKey: number) : Promise<any> {
        return this.http.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateKey}`).toPromise();
    }

    getCalender(districtId: number) : Promise<any> {
        return this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=31-05-2021`).toPromise();
    }
}