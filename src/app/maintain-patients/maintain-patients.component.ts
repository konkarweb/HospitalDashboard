import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../patients.service';
import { VaccineService } from '../vaccine.service';
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
  public PtName: any;
  public VaccinesList: any;
  public VaccinesListTmp: any;
  public PatientsDetailsTmp: any;
  Details: Boolean = true;
  DetailsChanged: Boolean = false;
  Vaccines: Boolean = false;
  visible: boolean = false;
  ChangeMode: boolean = false;
  PagePT: boolean = true;
  PageVC: boolean = false;
  public VaccineDetails: any;
  public VCIndex: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _paitentsService: PatientsService,
    private _vaccineService: VaccineService,
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
      DataChanged: new FormControl(''),
    }
  );


  FGVaccineDetails = new FormGroup(
    {
      VaccineDetail: new FormControl(''),
      NextVaccineDate: new FormControl(''),
      Vaccine: new FormControl(''),
      patientID: new FormControl(''),
      Date: new FormControl(''),
      DataChanged: new FormControl(''),
    }
  );


  DetailsChangedCheck(DetailsChanged: boolean) {

    if (this.PatientsDetailsTmp.firstName != this.PatientsDetails.value.firstName ||
      this.PatientsDetailsTmp.patientId != this.PatientsDetails.value.patientId ||
      this.PatientsDetailsTmp.patientType != this.PatientsDetails.value.patientType ||
      this.PatientsDetailsTmp.lastName != this.PatientsDetails.value.lastName ||
      this.PatientsDetailsTmp.middleName != this.PatientsDetails.value.middleName ||
      this.PatientsDetailsTmp.bloodGroup != this.PatientsDetails.value.bloodGroup ||
      this.PatientsDetailsTmp.mobileNumber != this.PatientsDetails.value.mobileNumber ||
      this.PatientsDetailsTmp.alternateNumber != this.PatientsDetails.value.alternateNumber ||
      this.PatientsDetailsTmp.qualification != this.PatientsDetails.value.qualification ||
      this.PatientsDetailsTmp.employmentStatus != this.PatientsDetails.value.employmentStatus ||
      this.PatientsDetailsTmp.uid != this.PatientsDetails.value.uid ||
      this.PatientsDetailsTmp.ageAtMarraige != this.PatientsDetails.value.ageAtMarraige ||
      this.PatientsDetailsTmp.dob != this.PatientsDetails.value.dob ||
      this.PatientsDetailsTmp.pregnancyType != this.PatientsDetails.value.pregnancyType ||
      this.PatientsDetailsTmp.noOfChildren != this.PatientsDetails.value.noOfChildren ||
      this.PatientsDetailsTmp.familyIncome != this.PatientsDetails.value.familyIncome) {
      DetailsChanged = true;
    }
  }

  onSelectVaccines(PatientID: any) {
    // console.log(Patient);
    //DetailsChangedCheck(this.DetailsChanged);


    this.PagePT = true;
    this.PageVC = false;

    this.Vaccines = true;
    this.Details = false;


    if (!this.VaccinesList) {

      this._vaccineService.getVaccine(PatientID)
        .subscribe((v: any) => {
          this.VaccinesList = v;

          console.log(this.VaccinesList);
        })

    }

  }


  onSelectDetails() {
    this.PagePT = true;
    this.PageVC = false;

    this.Vaccines = false;
    this.Details = true;
  }

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
          this.Ptid = res.id;
          this.ChangeMode = true;
          this.router.navigate(['/Patient', id]);
          console.log(res);

          this.firestore
            .collection('MotherVaccineDetails')
            .add({
              patientID: id,
              Date: "",
              Vaccine: "TT-1",
              VaccineDetail: "Early in pregnancy",
              NextVaccineDate: ""
            },)
            .then(res1 => {
              console.log(res1.id);
            }).catch(e => {
              console.log(e);
            });

          this.firestore
            .collection('MotherVaccineDetails')
            .add({
              patientID: id,
              Date: "",
              Vaccine: "TT-2",
              VaccineDetail: "4 weeks After TT-1*",
              NextVaccineDate: ""
            },)
            .then(res2 => {
              console.log(res2.id);
            }).catch(e => {
              console.log(e);
            });

          this.firestore
            .collection('MotherVaccineDetails')
            .add({
              patientID: id,
              Date: "",
              Vaccine: "TT-Booster",
              VaccineDetail: "If received 2 TT doses in a pregnancy within the last 3 yrs*",
              NextVaccineDate: ""
            },)
            .then(res3 => {
              console.log(res3.id);
            }).catch(e => {
              console.log(e);
            });

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

    this.PatientsDetailsTmp = this.PatientsDetails.value;
    this.DetailsChanged = false;
  }



  OnVaccineDetails(Index: any) {
    // this.VaccineDetails = this.VaccinesList.filter((data: { docId: any; }) => data.docId === VaccineID)[0];
    this.VCIndex = Index;
    this.VaccineDetails = this.VaccinesList[Index];

    //this.VaccinesList[Index].Vaccine = 'Changesd';
    console.log(this.VaccineDetails);

    this.PagePT = false;
    this.PageVC = true;

    this.FGVaccineDetails.patchValue({ VaccineDetail: this.VaccineDetails.VaccineDetail });
    this.FGVaccineDetails.patchValue({ NextVaccineDate: this.VaccineDetails.NextVaccineDate });
    this.FGVaccineDetails.patchValue({ Vaccine: this.VaccineDetails.Vaccine });
    this.FGVaccineDetails.patchValue({ patientID: this.Ptid.patientID });
    this.FGVaccineDetails.patchValue({ Date: this.VaccineDetails.middleName.Date });

  }

  OnVCApply(){
    this.VaccinesList[this.VCIndex].VaccineDetail =  this.FGVaccineDetails.value.VaccineDetail;
    this.VaccinesList[this.VCIndex].NextVaccineDate =  this.FGVaccineDetails.value.NextVaccineDate;
    this.VaccinesList[this.VCIndex].Vaccine =  this.FGVaccineDetails.value.Vaccine;
    this.VaccinesList[this.VCIndex].patientID =  this.FGVaccineDetails.value.patientID;
    this.VaccinesList[this.VCIndex].Date =  this.FGVaccineDetails.value.Date;

    this.PagePT = true;
    this.PageVC = false;

    this.Vaccines = true;
    this.Details = false;
  }

  OnVCCancel(){

  }

  ngOnInit(): void {



    let id = this.route.snapshot.paramMap.get('id');
    let idtmp = this.route.snapshot.paramMap.get('idtemp');
    this.Ptid = id;


    if (this.Ptid === 'New') {
      this.PtName = "New";
      this.PatientsDetails.patchValue({ patientId: this.Ptid });
    }
    else {
      this.ChangeMode = true;

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
            this.PatientsDetailsTmp = this.PatientsDetails.value;

          }
        })


    }


    // this.PatientsDetails.valueChanges.subscribe((selectedValue: any)  => {
    //   console.log('form value changed')
    //   console.log(selectedValue)
    // })




  }

}
