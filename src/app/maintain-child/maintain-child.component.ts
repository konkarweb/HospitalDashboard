import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildService } from '../child.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-maintain-child',
  templateUrl: './maintain-child.component.html',
  styleUrls: ['./maintain-child.component.css']
})
export class MaintainChildComponent implements OnInit {

  public Ptid: any;
  public child: any;
  public SLchild: any;
  public childList: any;
  public PtName: any
  visible: boolean = false;

  constructor(private route: ActivatedRoute,
    private _childService: ChildService,
    private firestore: AngularFirestore) {

  }



  ChildDetails = new FormGroup(
    {
      childId: new FormControl(''),
      patientType: new FormControl('Mother'),
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      MiddleName: new FormControl(''),
      BloodGroup: new FormControl(''),
      MobileNumber: new FormControl(''),
    }
  );


  OnSave() {

    if (this.Ptid === 'New') {

      this.firestore
        .collection('Childs')
        .add({ FirstName: this.ChildDetails.value.FirstName })
        .then(res => {
          console.log(res);
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
        .collection('Childs')
        .doc('/' + this.Ptid)
        .update({ bloodGroup: this.ChildDetails.value.BloodGroup })
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
      this.ChildDetails.patchValue({ childId: this.Ptid });
    }
    else {

      this.firestore
        .collection('Childs')
        .doc(this.Ptid).ref.get().then((doc) => {
          if (doc.exists) {
            console.log("Document data: ", doc.data());
            this.child = doc.data();
            this.PtName = this.child.firstName;
           // console.log(this.patient);
            this.ChildDetails.patchValue({ childId: this.Ptid });
            this.ChildDetails.patchValue({ patientType: this.child.patientType });
            this.ChildDetails.patchValue({ FirstName: this.child.firstName });
            this.ChildDetails.patchValue({ LastName: this.child.lastName });
            this.ChildDetails.patchValue({ MiddleName: this.child.middleName });
            this.ChildDetails.patchValue({ BloodGroup: this.child.bloodGroup });
            this.ChildDetails.patchValue({ MobileNumber: this.child.mobileNumber });
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
