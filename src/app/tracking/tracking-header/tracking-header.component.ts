import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { District } from 'src/app/models/district.model';
import { State } from 'src/app/models/state.model';
import { CowinApiService } from 'src/app/services/cowin-api.service';

export interface HeaderFormValues {
  stateControl: string,
  districtControl: string,
  ageControl: number,
  refreshFrequencyControl: number
}

@Component({
  selector: 'app-tracking-header',
  templateUrl: './tracking-header.component.html',
  styleUrls: ['./tracking-header.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TrackingHeaderComponent),
      multi: true
    }
  ]
})
export class TrackingHeaderComponent implements OnInit, OnDestroy {

  public stateMap = new Map<number, string>();
  public districtMap = new Map<number, string>();
  public preferencesFormGroup!: FormGroup;
  public enableDistrict = false;

  private subscriptions: Subscription[] = [];

  onChange: any = () => {};
  onTouched: any = () => {};

  get value(): HeaderFormValues {
    return this.preferencesFormGroup.value;
  }

  set value(value: HeaderFormValues) {
    this.preferencesFormGroup.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.preferencesFormGroup.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  constructor(private cowinService: CowinApiService,
              private formBuilder: FormBuilder) {
    this.preferencesFormGroup = this.formBuilder.group({
      stateControl: [],
      districtControl: [],
      ageControl: [],
      refreshFrequencyControl: []
    });

    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.preferencesFormGroup.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );

   }


  ngOnInit(): void {

    this.stateControl?.setValidators(Validators.required);
    this.districtControl?.setValidators(Validators.required);
    this.refreshFrequencyControl?.setValidators(Validators.required);

    this.cowinService.getStates().then(value => {
      value.states.forEach((element: State) => {
        this.stateMap.set(element.state_id, element.state_name);
      });
    });
  }

  selectedState(event: any) {    
    if (event.target.value) {
      this.enableDistrict = true;
      this.cowinService.getDistricts(event.target.value).then((value) => {
        value.districts.forEach((element: District) => {
          this.districtMap.set(element.district_id, element.district_name);
        });
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  get stateControl() {
    return this.preferencesFormGroup.get('stateControl');
  }

  get districtControl() {
    return this.preferencesFormGroup.get('districtControl');
  }

  get refreshFrequencyControl() {
    return this.preferencesFormGroup.get('refreshFrequencyControl');
  }
}
