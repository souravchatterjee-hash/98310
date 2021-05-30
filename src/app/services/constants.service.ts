import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ConstantsService {

    public readonly DUE_TIME = 1;
    public readonly START_TRACKING = 'START_TRACKING';
    public readonly STOP_TRACKING = 'STOP_TRACKING';
    public readonly PREFERENCES_FORM_CONTROL = 'preferences';

}