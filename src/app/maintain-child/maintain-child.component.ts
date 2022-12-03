import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildService } from '../child.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

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
  public MotherID: any;
  public MotherName: any;
  visible: boolean = false;
  has_parent : boolean = false;
  PagePT: boolean = true;
  PageVC: boolean = false;
  CallFromMother:boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _childService: ChildService,
    private firestore: AngularFirestore) {

  }



  ChildDetails = new FormGroup(
    {
      ChildId: new FormControl(''),
      patientType: new FormControl('Childs'),
      FirstName: new FormControl(''),
      LastName: new FormControl(''),
      MiddleName: new FormControl(''),
      BloodGroup: new FormControl(''),
      MobileNumber: new FormControl(''),
      DOB: new FormControl(''),      
      Gender: new FormControl(''),
      BirthHeadCircumference: new FormControl(''),
      BirthHeight: new FormControl(''),
      BirthWeight: new FormControl(''),      
      MotherID: new FormControl(''),
    }
  );
    onSelect(ChildID :  any){
      // console.log(Patient);
      this.router.navigate(['/Vaccines', ChildID]);
    }
    OnSave() {

      if (this.Ptid === 'New') {
  
        this.firestore
          .collection('Childs')
        .add({
          FirstName: this.ChildDetails.value.FirstName,
          ChildId: this.ChildDetails.value.ChildId,
          patientType: this.ChildDetails.value.patientType,
          LastName: this.ChildDetails.value.LastName,
          MiddleName: this.ChildDetails.value.MiddleName,
          BloodGroup: this.ChildDetails.value.BloodGroup,
          Gender: this.ChildDetails.value.Gender,          
          MobileNumber: this.ChildDetails.value.MobileNumber,
          DOB: this.ChildDetails.value.DOB,
          BirthHeadCircumference: this.ChildDetails.value.BirthHeadCircumference,
          BirthHeight: this.ChildDetails.value.BirthHeight,
          BirthWeight: this.ChildDetails.value.BirthWeight,
          MotherID: this.ChildDetails.value.MotherID,
        })
        .then(res => {
          const id = res.id;
          
          console.log(res);
          this.firestore
          .collection('VaccineDetails')
          .add({
            patientID: id,
            Date: "",
            Vaccine: "DTP 1,2 3",
            VaccineDetail: "At 6 Weeks, 10 Weeks 14 Weeks",
            NextVaccineDate: ""
          },)
          .then(res1 => { 
            console.log(res1.id);
          }).catch(e => {
            console.log(e);
          });

          this.firestore
          .collection('VaccineDetails')
          .add({
            patientID: id,
            Date: "",
            Vaccine: "BCG",
            VaccineDetail: "At birth or as early as possible till one year of age",
            NextVaccineDate: ""
          },)
          .then(res2 => { 
            console.log(res2.id);
          }).catch(e => {
            console.log(e);
          });

          this.firestore
          .collection('VaccineDetails')
          .add({
            patientID: id,
            Date: "",
            Vaccine: "Hepatitis",
            VaccineDetail: "At birth or as early as possible within 24 hours",
            NextVaccineDate: ""
          },)
          .then(res3 => {
            console.log(res3.id);
           }).catch(e => {
            console.log(e);
          });

          this.visible = true;
          //this.form.reset();

          this.Ptid = id;

          if(this.CallFromMother)
          {
            this.router.navigate(['/Child', this.MotherID, this.MotherName, id]);
          }
          else
          {
            this.router.navigate(['/Child', id]);
          }

         

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
        .update({
          FirstName: this.ChildDetails.value.FirstName,
          ChildId: this.ChildDetails.value.ChildId,
          patientType: this.ChildDetails.value.patientType,
          LastName: this.ChildDetails.value.LastName,
          MiddleName: this.ChildDetails.value.MiddleName,
          BloodGroup: this.ChildDetails.value.BloodGroup,
          Gender: this.ChildDetails.value.Gender,          
          MobileNumber: this.ChildDetails.value.MobileNumber,
          DOB: this.ChildDetails.value.DOB,
          BirthHeadCircumference: this.ChildDetails.value.BirthHeadCircumference,
          BirthHeight: this.ChildDetails.value.BirthHeight,
          BirthWeight: this.ChildDetails.value.BirthWeight,    
          MotherID: this.ChildDetails.value.MotherID,      

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

  ShowChilds(PTID:any, PTNAME:any){
    this.router.navigate(['/Childs', PTID, PTNAME]);
  }

  OnSelectMother(PTID: any) {
    this.router.navigate(['/Patient', PTID]);

  }

  ngOnInit(): void {



    let id = this.route.snapshot.paramMap.get('id');
    this.MotherID = this.route.snapshot.paramMap.get('MTid');
    this.MotherName = this.route.snapshot.paramMap.get('MTname');
    this.Ptid = id;

    if(!this.MotherID)
    {
      this.CallFromMother = false;
    }
    else
    {
      this.CallFromMother = true;
    }

    if (this.Ptid === 'New') {
      this.PtName = "New";
      this.ChildDetails.patchValue({ ChildId: this.Ptid });
      this.ChildDetails.patchValue({MotherID: this.MotherID});
    }
    else {

      this.firestore
        .collection('Childs')
        .doc(this.Ptid).ref.get().then((doc) => {
          if (doc.exists) {
            console.log("Document data: ", doc.data());
            this.child = doc.data();
            this.PtName = this.child.FirstName;
            // console.log(this.patient);
            this.ChildDetails.patchValue({ ChildId: this.Ptid });
            this.ChildDetails.patchValue({ patientType: this.child.patientType });
            this.ChildDetails.patchValue({ FirstName: this.child.FirstName });
            this.ChildDetails.patchValue({ LastName: this.child.LastName });
            this.ChildDetails.patchValue({ MiddleName: this.child.MiddleName });
            this.ChildDetails.patchValue({ BloodGroup: this.child.BloodGroup });
            this.ChildDetails.patchValue({ Gender: this.child.Gender });            
            this.ChildDetails.patchValue({ MobileNumber: this.child.MobileNumber });
            this.ChildDetails.patchValue({ DOB: this.child.DOB });
            this.ChildDetails.patchValue({ BirthHeadCircumference: this.child.BirthHeadCircumference });
            this.ChildDetails.patchValue({ BirthHeight: this.child.BirthHeight });
            this.ChildDetails.patchValue({ BirthWeight: this.child.BirthWeight });
            this.ChildDetails.patchValue({MotherID: this.child.MotherID});
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
