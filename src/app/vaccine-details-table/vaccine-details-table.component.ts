import { Component, OnInit, Input } from '@angular/core';
import { VaccineDetailsTableService } from '../vaccine-details-table.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vaccine-details-table',
  templateUrl: './vaccine-details-table.component.html',
  styleUrls: ['./vaccine-details-table.component.css']
})

export class VaccineDetailsTableComponent implements OnInit {
  @Input() colorValue: any;
  // public Patients: any;
  data: any;
  isLoading = false;
  public userType: any;

  Patients = [
    { "Id": "1", "Fname": "Rama", "Lname": "Sharma", "Age": "31", "Contact_No": "8767678987" },
    { "Id": "2", "Fname": "Kanta", "Lname": "Shaha", "Age": "27", "Contact_No": "8876547890" },
    { "Id": "3", "Fname": "Reshma", "Lname": "Gupta", "Age": "29", "Contact_No": "9898564534" }
  ];

  constructor(private dataService: VaccineDetailsTableService, private route: ActivatedRoute) {

  }

  ngOnChanges(): void {
    console.log('timee');
    this.userType = this.route.snapshot.params['tab'];
    this.isLoading = true;
    if (this.userType == 'Child') {

      if (this.colorValue == 'Green') {
        this.dataService.getChildCompletedVaccineData().subscribe(data => {
          this.data = data;
          this.isLoading = false;
          console.log(data);
        });
      }
      if (this.colorValue == 'Red') {
        this.dataService.getChildDueVaccineData().subscribe(data => {
          this.data = data;
          this.isLoading = false;
          console.log(data);
        });
      }
      if (this.colorValue == 'Blue') {
        this.dataService.getChildUpcomingVaccineData().subscribe(data => {
          this.data = data;
          this.isLoading = false;
          console.log(data);
        });
      }

    }
  }

  ngOnInit(): void {
    
  }



}
