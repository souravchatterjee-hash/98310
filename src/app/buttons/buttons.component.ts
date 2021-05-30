import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConstantsService } from '../services/constants.service';
import { PollingService } from '../services/polling.service';
import { SubjectsService } from '../services/subjects.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  private audio = new Audio();

  public showURL!: boolean;
  public disableStartButton!: boolean;
  public disableStopButton = true;
  
  constructor(private constants: ConstantsService, 
              private subjectService: SubjectsService,
              private pollingService: PollingService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.subjectService.disableStartTrackingButton.subscribe((disableButton: boolean) => {
      this.disableStartButton = disableButton;
    }));

    this.subscriptions.push(this.subjectService.disableStopTrackingButton.subscribe((disableButton: boolean) => {
      this.disableStopButton = disableButton;
    }));

    this.subscriptions.push(this.subjectService.showCowinURL.subscribe((showUrl: boolean) => {
      this.playAudio();
      this.showURL = showUrl;
    }));
  }

  onClick(buttonDetails: string) {
    if(buttonDetails === this.constants.START_TRACKING) {
      this.subjectService.buttonDetails.next(this.constants.START_TRACKING);
    } else if(buttonDetails === this.constants.STOP_TRACKING) {
      this.subjectService.disableStartTrackingButton.next(false);
      this.subjectService.disableStopTrackingButton.next(true);
      this.stopAudio();
      this.pollingService.ngOnDestroy();
    }
  }

  gotoCowin() {
    window.open("https://selfregistration.cowin.gov.in/", "_blank");
    this.stopAudio();
  }

  playAudio() {
    this.audio.src="https://www.w3schools.com/jsref/horse.mp3";
    this.audio.load();
    this.audio.loop = true;
    this.audio.play();
  }

  stopAudio() {
    this.audio.pause();
  }
}
