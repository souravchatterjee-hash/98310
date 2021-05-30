import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Centers } from '../models/centers.model';
import { ConstantsService } from '../services/constants.service';
import { CowinApiService } from '../services/cowin-api.service';
import { PollingService } from '../services/polling.service';
import { SubjectsService } from '../services/subjects.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnDestroy {

  public trackingFormGroup!: FormGroup;
  public centers!: Centers;
  public freeText!: string;

  private subscriptions: Subscription[] = [];

  constructor(private subjectService: SubjectsService,
    private constantService: ConstantsService,
    private formBuilder: FormBuilder,
    private pollingService: PollingService) {
    this.trackingFormGroup = this.formBuilder.group({
      preferences: []
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(this.subjectService.buttonDetails.subscribe((buttonDetails: string) => {
      if (buttonDetails === this.constantService.START_TRACKING) {
        this.subjectService.disableStartTrackingButton.next(true);
        this.subjectService.disableStopTrackingButton.next(false);
        this.pollingService.districtId = this.districtControl;
        this.pollingService.timeInterval = this.refreshFrequencyControl;
        this.pollingService.getRfreshedData().subscribe((centerDetails) => {
          this.centers = centerDetails;
          if (this.centers) {
            this.freeText = 'Details Found';
          } else {
            this.freeText = 'No Details Found!';
          }
        });
      }
    }));
  }

  get preferenceControl() {
    return this.trackingFormGroup?.get(this.constantService.PREFERENCES_FORM_CONTROL);
  }

  get stateControl() {
    return this.trackingFormGroup?.get(this.constantService.PREFERENCES_FORM_CONTROL)?.value.stateControl;
  }

  get districtControl() {
    return this.trackingFormGroup?.get(this.constantService.PREFERENCES_FORM_CONTROL)?.value.districtControl;
  }

  get ageControl() {
    return this.trackingFormGroup?.get(this.constantService.PREFERENCES_FORM_CONTROL)?.value.ageControl;
  }

  get refreshFrequencyControl() {
    return this.trackingFormGroup?.get(this.constantService.PREFERENCES_FORM_CONTROL)?.value.refreshFrequencyControl;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

}
