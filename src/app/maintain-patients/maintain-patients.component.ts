import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../patients.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintain-patients',
  templateUrl: './maintain-patients.component.html',
  styleUrls: ['./maintain-patients.component.css']
})
export class MaintainPatientsComponent implements OnInit {

  public Ptid: any;
  public patient: any;
  public SLpatient: any;
  public PatientsList: any;
  public PtName: any
  visible: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _paitentsService: PatientsService,
    private firestore: AngularFirestore) {

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
      pregnancyType: new FormControl(''),
      noOfChildren: new FormControl(''),
      familyIncome: new FormControl(''),
    }
  );


  OnSave() {

    if (this.Ptid === 'New') {

      this.firestore
        .collection('Patients')
        .add({
          firstName: this.PatientsDetails.value.firstName,
          patientId: this.PatientsDetails.value.patientId,
          patientType: this.PatientsDetails.value.patientType,
          lastName: this.PatientsDetails.value.lastName,
          middleName: this.PatientsDetails.value.middleName,
          bloodGroup: this.PatientsDetails.value.bloodGroup,
          mobileNumber: this.PatientsDetails.value.mobileNumber,
          alternateNumber: this.PatientsDetails.value.alternateNumber,
          qualification: this.PatientsDetails.value.qualification,
          employmentStatus: this.PatientsDetails.value.employmentStatus,
          uid: this.PatientsDetails.value.uid,
          ageAtMarraige: this.PatientsDetails.value.ageAtMarraige,
          dob: this.PatientsDetails.value.dob,
          pregnancyType: this.PatientsDetails.value.pregnancyType,
          noOfChildren: this.PatientsDetails.value.noOfChildren,
          familyIncome: this.PatientsDetails.value.familyIncome
        })
        .then(res => {
          const id = res.id;
          this.router.navigate(['/Patient', id]);
          console.log(res);
          this.visible = true;
          //this.form.reset();
        })
        .catch(e => {
          console.log(e);
        });



      // console.log(this.PatientsDetails.value);
      // this._paitentsService.SavePatient(this.PatientsDetails.value)
      //   .subscribe(
      //     response => console.log('Sucess!', response)
      //   )
    }
    else {

      this.firestore
        .collection('Patients')
        .doc('/' + this.Ptid)
        .update({
          firstName: this.PatientsDetails.value.firstName,
          patientId: this.PatientsDetails.value.patientId,
          patientType: this.PatientsDetails.value.patientType,
          lastName: this.PatientsDetails.value.lastName,
          middleName: this.PatientsDetails.value.middleName,
          bloodGroup: this.PatientsDetails.value.bloodGroup,
          mobileNumber: this.PatientsDetails.value.mobileNumber,
          alternateNumber: this.PatientsDetails.value.alternateNumber,
          qualification: this.PatientsDetails.value.qualification,
          employmentStatus: this.PatientsDetails.value.employmentStatus,
          uid: this.PatientsDetails.value.uid,
          ageAtMarraige: this.PatientsDetails.value.ageAtMarraige,
          dob: this.PatientsDetails.value.dob,
          pregnancyType: this.PatientsDetails.value.pregnancyType,
          noOfChildren: this.PatientsDetails.value.noOfChildren,
          familyIncome: this.PatientsDetails.value.familyIncome
        })
        .then(() => {
          this.visible = true;
          console.log('done');
        })
        .catch(function (error) {
          //this.visible = false; 
          console.error('Error writing document: ', error);
        });

    }

  }

  ngOnInit(): void {



    let id = this.route.snapshot.paramMap.get('id');
    this.Ptid = id;


    if (this.Ptid === 'New') {
      this.PtName = "New";
      this.PatientsDetails.patchValue({ patientId: this.Ptid });
    }
    else {

      this.firestore
        .collection('Patients')
        .doc(this.Ptid).ref.get().then((doc) => {
          if (doc.exists) {
            console.log("Document data: ", doc.data());
            this.patient = doc.data();
            this.PtName = this.patient.firstName;
            // console.log(this.patient);
            this.PatientsDetails.patchValue({ patientId: this.Ptid });
            this.PatientsDetails.patchValue({ patientType: this.patient.patientType });
            this.PatientsDetails.patchValue({ firstName: this.patient.firstName });
            this.PatientsDetails.patchValue({ lastName: this.patient.lastName });
            this.PatientsDetails.patchValue({ middleName: this.patient.middleName });
            this.PatientsDetails.patchValue({ bloodGroup: this.patient.bloodGroup });
            this.PatientsDetails.patchValue({ mobileNumber: this.patient.mobileNumber });
            this.PatientsDetails.patchValue({ alternateNumber: this.patient.alternateNumber });
            this.PatientsDetails.patchValue({ qualification: this.patient.qualification });
            this.PatientsDetails.patchValue({ employmentStatus: this.patient.employmentStatus });
            this.PatientsDetails.patchValue({ uid: this.patient.uid });
            this.PatientsDetails.patchValue({ ageAtMarraige: this.patient.ageAtMarraige });
            this.PatientsDetails.patchValue({ dob: this.patient.dob });
            this.PatientsDetails.patchValue({ pregnancyType: this.patient.pregnancyType });
            this.PatientsDetails.patchValue({ noOfChildren: this.patient.noOfChildren });

          }
        })




      //   this._paitentsService.getSingleUser(id)
      //   .subscribe((v:any) => {
      //     this.patient = v;
      //     this.PtName = this.patient.firstName;
      //     console.log(this.patient);
      //     this.PatientsDetails.patchValue({patientId:this.Ptid});
      //     this.PatientsDetails.patchValue({patientType:this.patient.patientType});
      //     this.PatientsDetails.patchValue({firstName:this.patient.firstName});
      //     this.PatientsDetails.patchValue({lastName:this.patient.lastName});
      //     this.PatientsDetails.patchValue({middleName:this.patient.middleName});
      //     this.PatientsDetails.patchValue({bloodGroup:this.patient.bloodGroup});
      //     this.PatientsDetails.patchValue({mobileNumber:this.patient.mobileNumber});
      //     this.PatientsDetails.patchValue({alternateNumber:this.patient.alternateNumber});
      //     this.PatientsDetails.patchValue({qualification:this.patient.qualification});
      //     this.PatientsDetails.patchValue({employmentStatus:this.patient.employmentStatus});
      //     this.PatientsDetails.patchValue({uid:this.patient.uid});
      //     this.PatientsDetails.patchValue({ageAtMarraige:this.patient.ageAtMarraige});
      //     this.PatientsDetails.patchValue({dob:this.patient.dob});
      //   })
      // }

      // this.SLpatient = this.patients.filter(x => x.Id === id);
      // this.patient = this.SLpatient[0];
      // console.log(this.patient);
    }







  }

}
