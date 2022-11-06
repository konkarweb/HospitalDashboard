import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../patients.service';
import { FormControl, FormGroup } from '@angular/forms';

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
  public PtName:any

   
  constructor(private route: ActivatedRoute,
              private _paitentsService: PatientsService) { 
                
              }

 

    PatientsDetails = new FormGroup(
      {
        patientId: new FormControl(''),
        patientType: new FormControl('Mother'),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        middleName: new FormControl(''),
        bloodGroup: new FormControl(''),
        mobileNumber: new FormControl(''),
        alternateNumber: new FormControl(''),
        qualification: new FormControl(''),
        employmentStatus: new FormControl(''),
        uid: new FormControl(''),
        ageAtMarraige: new FormControl(''),
        dob: new FormControl(''),
      }
    );


    OnSave(){
      console.log(this.PatientsDetails.value);
      this._paitentsService.SavePatient(this.PatientsDetails.value)
      .subscribe(
        response => console.log('Sucess!', response)
      )
    }

  ngOnInit(): void {

   

    let id = this.route.snapshot.paramMap.get('id');
    this.Ptid = id;
    

    if(this.Ptid === 'New')
    {
      this.PtName = "New";
      this.PatientsDetails.patchValue({patientId:this.Ptid});
    }
    else
    {
      this._paitentsService.getSingleUser(id)
      .subscribe((v:any) => {
        this.patient = v;
        this.PtName = this.patient.firstName;
        console.log(this.patient);
        this.PatientsDetails.patchValue({patientId:this.Ptid});
        this.PatientsDetails.patchValue({patientType:this.patient.patientType});
        this.PatientsDetails.patchValue({firstName:this.patient.firstName});
        this.PatientsDetails.patchValue({lastName:this.patient.lastName});
        this.PatientsDetails.patchValue({middleName:this.patient.middleName});
        this.PatientsDetails.patchValue({bloodGroup:this.patient.bloodGroup});
        this.PatientsDetails.patchValue({mobileNumber:this.patient.mobileNumber});
        this.PatientsDetails.patchValue({alternateNumber:this.patient.alternateNumber});
        this.PatientsDetails.patchValue({qualification:this.patient.qualification});
        this.PatientsDetails.patchValue({employmentStatus:this.patient.employmentStatus});
        this.PatientsDetails.patchValue({uid:this.patient.uid});
        this.PatientsDetails.patchValue({ageAtMarraige:this.patient.ageAtMarraige});
        this.PatientsDetails.patchValue({dob:this.patient.dob});
      })
    }

    // this.SLpatient = this.patients.filter(x => x.Id === id);
    // this.patient = this.SLpatient[0];
    // console.log(this.patient);
  }




  

  
}
