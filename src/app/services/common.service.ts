import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CommonService {

    public buttonDetails = new Subject<string>();
    public showCowinURL = new Subject<boolean>();
    public disableStartTrackingButton = new Subject<boolean>();
    public disableStopTrackingButton = new Subject<boolean>();

    private audio = new Audio();

    playAudio() {
        this.audio.src = "https://www.w3schools.com/jsref/horse.mp3";
        this.audio.load();
        this.audio.loop = true;
        this.audio.play();
    }

    stopAudio() {
        this.audio.pause();
    }
}