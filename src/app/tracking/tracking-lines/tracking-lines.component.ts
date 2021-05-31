import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Centers } from 'src/app/models/centers.model';
import { Sessions } from 'src/app/models/sessions.model';
import { CowinApiService } from 'src/app/services/cowin-api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Session } from 'selenium-webdriver';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-tracking-lines',
  templateUrl: './tracking-lines.component.html',
  styleUrls: ['./tracking-lines.component.css']
})
export class TrackingLinesComponent implements OnInit {

  @Input() public centerDetails: any;
  @Input() public minAge!: number;

  public p: number = 1;
  public showUrl!: boolean;


  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.centerDetails?.centers.forEach((element: Centers) => {
      element.sessions.forEach((session: Sessions) => {
        if (session.available_capacity > 0 &&
          (session.available_capacity_dose1 > 0 ||
            session.available_capacity_dose2 > 0)) {
          this.showUrl = true;
          this.commonService.showCowinURL.next(this.showUrl);
        }
      })
    });

  }

}
