import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class SubjectsService {

    public buttonDetails = new Subject<string>();
    public showCowinURL = new Subject<boolean>();
    public disableStartTrackingButton = new Subject<boolean>();
    public disableStopTrackingButton = new Subject<boolean>();
}