import { Component, OnInit, Input } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';
import { VaccineDetailsTableService } from '../vaccine-details-table.service';

@Component({
  selector: 'app-vaccine-details',
  templateUrl: './vaccine-details.component.html',
  styleUrls: ['./vaccine-details.component.css']
})
export class VaccineDetailsComponent implements OnInit {
  dataComp: any;
  dataDue: any;
  dataUpcom: any;
  public Color: any;
  isLoading = true;
  public userType : any;
  totalComp = 0; 
  totalDue = 0;
  totalUpco = 0;
  showTableFlag = false;
  constructor(private router: Router,private route: ActivatedRoute,private dataService: VaccineDetailsTableService) { }

  ngOnInit(): void {
    this.userType = this.route.snapshot.params['tab'];
    this.isLoading = true;
    
    if (this.userType === 'Child'){
      console.log(this.userType);
      this.dataService.getChildCompletedVaccineData().subscribe(data => {
        this.dataComp = data;
        this.totalComp = data.length;
        
      });
  
      this.dataService.getChildDueVaccineData().subscribe(data => {
        this.dataDue = data;
        this.totalDue = data.length;
      });
  
      this.dataService.getChildUpcomingVaccineData().subscribe(data => {
        this.dataUpcom = data;
        this.totalUpco = data.length;
      });
    }else{
      this.dataService.getParentCompletedVaccineData().subscribe(data => {
        this.dataComp = data;
        this.totalComp = data.length;
        
      });
  
      this.dataService.getParentDueVaccineData().subscribe(data => {
        this.dataDue = data;
        this.totalDue = data.length;
      });
  
      this.dataService.getParentUpcomingVaccineData().subscribe(data => {
        this.dataUpcom = data;
        this.totalUpco = data.length;
      });
    }
   
    this.isLoading = false;
  }
  OnSelect(Color :any){
    this.showTableFlag = true;
    this.Color = Color;
    // this.router.navigate(['/VaccineDetailsTable', Color]);
  }
  
}
