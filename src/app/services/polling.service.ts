import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Subject, timer } from "rxjs";
import { CowinApiService } from "./cowin-api.service";
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { ConstantsService } from "./constants.service";
import { Centers } from "../models/centers.model";

@Injectable({
    providedIn: 'root',
})
export class PollingService implements OnDestroy {

    public districtId! : number;
    public timeInterval! : number; 

    private stopPolling = new Subject();

    constructor(private cowinService: CowinApiService,
                private constants: ConstantsService) {}

    getRfreshedData(): Observable<Centers> {   
        return timer(this.constants.DUE_TIME, (this.timeInterval * 60000)).pipe(
            switchMap(() => this.cowinService.getCalender(this.districtId)),
            share(),
            retry(),
            takeUntil(this.stopPolling));
    }

    ngOnDestroy() {
        this.stopPolling.next();
    }
}