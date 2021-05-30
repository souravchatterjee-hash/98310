import { Component, Input, OnInit } from '@angular/core';
import { Centers } from 'src/app/models/centers.model';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-tracking-line',
  templateUrl: './tracking-line.component.html',
  styleUrls: ['./tracking-line.component.css']
})
export class TrackingLineComponent implements OnInit {

  @Input() centerDetails!: Centers;
  @Input() selectedMinAge! : number;

  public mark = false;
  private showUrl = false;

  constructor(private subjectService: SubjectsService) { }

  ngOnInit(): void {

    this.centerDetails.sessions.forEach(e => {
      if(e.available_capacity > 0 || 
        e.available_capacity_dose1 > 0 || 
        e.available_capacity_dose2 > 0) {
          this.mark = true;
          this.showUrl = true;
          this.subjectService.showCowinURL.next(this.showUrl);
      }
    });  

  }

  

}
