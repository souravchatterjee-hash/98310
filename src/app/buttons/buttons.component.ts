import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConstantsService } from '../services/constants.service';
import { PollingService } from '../services/polling.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  private subscriptions: Subscription[] = [];

  public showURL!: boolean;
  public disableStartButton!: boolean;
  public disableStopButton = true;
  
  constructor(private constants: ConstantsService, 
              public commonService: CommonService,
              private pollingService: PollingService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.commonService.disableStartTrackingButton.subscribe((disableButton: boolean) => {
      this.disableStartButton = disableButton;
    }));

    this.subscriptions.push(this.commonService.disableStopTrackingButton.subscribe((disableButton: boolean) => {
      this.disableStopButton = disableButton;
    }));

    this.subscriptions.push(this.commonService.showCowinURL.subscribe((showUrl: boolean) => {
      this.commonService.playAudio();
      this.showURL = showUrl;
    }));
  }

  onClick(buttonDetails: string) {
    if(buttonDetails === this.constants.START_TRACKING) {
      this.commonService.buttonDetails.next(this.constants.START_TRACKING);
    } else if(buttonDetails === this.constants.STOP_TRACKING) {
      this.commonService.disableStartTrackingButton.next(false);
      this.commonService.disableStopTrackingButton.next(true);
      this.commonService.stopAudio();
      this.pollingService.ngOnDestroy();
    }
  }

  gotoCowin() {
    window.open("https://selfregistration.cowin.gov.in/", "_blank");
    this.commonService.stopAudio();
  }

}
