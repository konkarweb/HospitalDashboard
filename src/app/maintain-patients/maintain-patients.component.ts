import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-maintain-patients',
  templateUrl: './maintain-patients.component.html',
  styleUrls: ['./maintain-patients.component.css']
})
export class MaintainPatientsComponent implements OnInit {

  public Ptid:any;
  public patient:any;
  public SLpatient:any;
  public PatientsList:any;

   
  constructor(private route: ActivatedRoute,
              private _paitentsService: PatientsService) { }

 
  ngOnInit(): void {

   

    let id = this.route.snapshot.paramMap.get('id');
    this.Ptid = id;

    this._paitentsService.getSingleUser(id)
    .subscribe((v:any) => {
      this.patient = v;
      console.log(this.patient);
    })

    // this.SLpatient = this.patients.filter(x => x.Id === id);
    // this.patient = this.SLpatient[0];
    // console.log(this.patient);
  }

  

  
}
