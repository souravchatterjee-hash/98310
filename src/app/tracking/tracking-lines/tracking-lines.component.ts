import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Centers } from 'src/app/models/centers.model';
import { Sessions } from 'src/app/models/sessions.model';
import { CowinApiService } from 'src/app/services/cowin-api.service';

@Component({
  selector: 'app-tracking-lines',
  templateUrl: './tracking-lines.component.html',
  styleUrls: ['./tracking-lines.component.css']
})
export class TrackingLinesComponent implements OnInit {

  @Input() public centerDetails: any;
  @Input() public minAge!: number;
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
