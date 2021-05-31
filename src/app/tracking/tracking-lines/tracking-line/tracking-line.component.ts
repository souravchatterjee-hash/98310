import { Component, Input, OnInit } from '@angular/core';
import { Centers } from 'src/app/models/centers.model';
import { Sessions } from 'src/app/models/sessions.model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-tracking-line',
  templateUrl: './tracking-line.component.html',
  styleUrls: ['./tracking-line.component.css']
})
export class TrackingLineComponent implements OnInit {

  @Input() centerDetails: any;
  @Input() selectedMinAge! : number;
  
  public mark! : boolean;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {

    this.centerDetails?.sessions.forEach((e: Sessions) => {
      if(e.available_capacity > 0 && 
        (e.available_capacity_dose1 > 0 || 
        e.available_capacity_dose2 > 0)) {
          this.mark = true;          
      }
    });  

  }

  

}
