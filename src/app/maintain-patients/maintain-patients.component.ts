import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from '../patients.service';
import { VaccineService } from '../vaccine.service';
import { MedicalHistoryService } from '../medical-history.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Call } from '@angular/compiler';
import { ignoreElements } from 'rxjs';

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

  public CurrentTimeStamp: any;
  public CurrentUser: any;



  Details: Boolean = true;
  DetailsChanged: Boolean = false;
  Vaccines: Boolean = false;
  visible: boolean = false;
  ChangeMode: boolean = false;
  PagePT: boolean = true;
  PageVC: boolean = false;
  PageHS: Boolean = false;
  PagePO: Boolean = false;
  PageVS: Boolean = false;


  public VaccineDetails: any;
  public MHistoryDetails: any;
  public POutcomeDetails: any;
  public VisitDetails: any;

  public VCIndex: any;
  public MHIndex: any;
  public POIndex: any;
  public VSIndex: any;

  public HistoryList: any;
  public History: any;

  public PregnancyOutcomeList: any;
  public PregnancyOutcome: any;

  public VisitsList: any;
  public Visits: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _paitentsService: PatientsService,
    private _vaccineService: VaccineService,
    private _medicalHistoryServive: MedicalHistoryService,
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
      AddressLine1: new FormControl(''),
      AddressLine2: new FormControl(''),
      State: new FormControl(''),
      City: new FormControl(''),
      Pincode: new FormControl(''),
    }
  );


  FGVaccineDetails = new FormGroup(
    {
      VaccineDetail: new FormControl(''),
      ScheduledOn: new FormControl(''),
      Vaccine: new FormControl(''),
      patientID: new FormControl(''),
      Date: new FormControl(''),
      DataChanged: new FormControl(''),
    }
  );


  FGMHistoryDetails = new FormGroup(
    {
      Disease: new FormControl(''),
      comments: new FormControl(''),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    }
  );

  FGPOutcomeDetails = new FormGroup(
    {
      comments: new FormControl(''),
      deliveryDate: new FormControl(''),
      deliveryPlace: new FormControl(''),
      outcome: new FormControl(''),
    }
  );


  FGVisitDetails = new FormGroup(
    {
      comments: new FormControl(''),
      visitedBy: new FormControl(''),
      visitDate: new FormControl(''),
      signAndSymptoms: new FormControl(''),
      redFlagComments: new FormControl(''),
      prescription: new FormControl(''),
      LMP: new FormControl(''),
    }
  );


  CurrentTimeStampGet() {
    const current = new Date();

    let lv_date: string;
    let lv_month: string;
    let lv_year: string;

    let lv_hour: string;
    let lv_min: string;
    let lv_sec: string;

    lv_date = current.getDate() + "";
    lv_month = current.getMonth() + "";
    lv_year = current.getFullYear() + "";

    lv_hour = current.getHours() + "";
    lv_min = current.getMinutes() + "";
    lv_sec = current.getSeconds() + "";

    if (lv_date.length == 1) {
      lv_date = 0 + lv_date;
    }

    if (lv_month.length == 1) {
      lv_month = 0 + lv_month;
    }

    if (lv_hour.length == 1) {
      lv_hour = 0 + lv_hour;
    }


    if (lv_min.length == 1) {
      lv_min = 0 + lv_min;
    }

    if (lv_sec.length == 1) {
      lv_sec = 0 + lv_sec;
    }

    let timestamp = lv_year + lv_month + lv_date + lv_hour + lv_min + lv_sec;

    return timestamp;
  }


  onSelectVaccines(PatientID: any) {
    // console.log(Patient);
    //DetailsChangedCheck(this.DetailsChanged);


    this.PagePT = true;
    this.Details = false;
    this.Vaccines = true;
    this.History = false;
    this.PregnancyOutcome = false;
    this.Visits = false;

    this.PageVC = false;
    this.PageHS = false;
    this.PagePO = false;
    this.PageVS = false;


    if (!this.VaccinesList) {

      this._vaccineService.getVaccine(PatientID)
        .subscribe((v: any) => {
          this.VaccinesList = v;

          console.log(this.VaccinesList);
        })

    }

    //console.log(this.VaccinesList[this.VCIndex]);

  }



  onSelectHistory(PatientID: any) {
    // console.log(Patient);
    //DetailsChangedCheck(this.DetailsChanged);


    this.PagePT = true;
    this.Details = false;
    this.Vaccines = false;
    this.History = true;
    this.PregnancyOutcome = false;
    this.Visits = false;

    this.PageVC = false;
    this.PageHS = false;
    this.PagePO = false;
    this.PageVS = false;


    if (!this.HistoryList) {

      this._paitentsService.getMedicalHistory(PatientID)
        .subscribe((v: any) => {
          this.HistoryList = v;

          console.log(this.HistoryList);
        })

    }

  }


  onSelectPregnancyOutcome(PatientID: any) {
    // console.log(Patient);
    //DetailsChangedCheck(this.DetailsChanged);


    this.PagePT = true;
    this.Details = false;
    this.Vaccines = false;
    this.History = false;
    this.PregnancyOutcome = true;
    this.Visits = false;


    this.PageVC = false;
    this.PageHS = false;
    this.PagePO = false;
    this.PageVS = false;


    if (!this.PregnancyOutcomeList) {

      this._paitentsService.getPregnancyOutcome(PatientID)
        .subscribe((v: any) => {
          this.PregnancyOutcomeList = v;

          console.log(this.PregnancyOutcomeList);
        })

    }

  }

  onSelectVisits(PatientID: any) {
    // console.log(Patient);
    //DetailsChangedCheck(this.DetailsChanged);


    this.PagePT = true;
    this.Details = false;
    this.Vaccines = false;
    this.History = false;
    this.PregnancyOutcome = false;
    this.Visits = true;


    this.PageVC = false;
    this.PageHS = false;
    this.PagePO = false;
    this.PageVS = false;


    if (!this.VisitsList) {

      this._paitentsService.getVisits(PatientID)
        .subscribe((v: any) => {
          this.VisitsList = v;

          console.log(this.VisitsList);
        })

    }

  }


  onSelectDetails() {
    this.PagePT = true;
    this.Details = true;
    this.Vaccines = false;
    this.History = false;
    this.PregnancyOutcome = false;
    this.Visits = false;

    this.PageVC = false;
    this.PageHS = false;
    this.PagePO = false;
    this.PageVS = false;
  }

  OnSave() {

    this.CurrentTimeStamp = this.CurrentTimeStampGet();
    //this.CurrentUser = 'wVYbQJ43GSfHLtZ7DSYA';
    let DocPath = "/Mother/" + this.Ptid;
    let userDTL = JSON.parse(localStorage.getItem('userDTL')!);

    this.CurrentUser = userDTL.docId;
    console.log(userDTL);
    if (this.Ptid === 'New') {

      this.firestore
        .collection('Mother')
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
          familyIncome: this.PatientsDetails.value.familyIncome,

          AddressLine1: this.PatientsDetails.value.AddressLine1,
          AddressLine2: this.PatientsDetails.value.AddressLine2,
          State: this.PatientsDetails.value.State,
          City: this.PatientsDetails.value.City,
          Pincode: this.PatientsDetails.value.Pincode,
          AssignedVolunteer: this.CurrentUser,
          CreatedBy: this.CurrentUser,
          CreatedOn: this.CurrentTimeStamp
        })
        .then(res => {
          const id = res.id;
          this.Ptid = res.id;
          this.ChangeMode = true;
          this.router.navigate(['/Patient', id]);
          console.log(res);

          this.firestore
            .collection('VaccineDetails')
            .add({
              patientID: id,
              Sq: 1,
              ScheduledOn: "",
              Date: "",
              Vaccine: "TT-1",
              VaccineDetail: "Early in pregnancy",
              CreatedBy: this.CurrentUser,
              CreatedOn: this.CurrentTimeStamp
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
              Sq: 2,
              ScheduledOn: "",
              Date: "",
              Vaccine: "TT-2",
              VaccineDetail: "4 weeks After TT-1*",
              CreatedBy: this.CurrentUser,
              CreatedOn: this.CurrentTimeStamp,
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
              Sq: 3,
              ScheduledOn: "",
              Date: "",
              Vaccine: "TT-Booster",
              VaccineDetail: "If received 2 TT doses in a pregnancy within the last 3 yrs*",
              CreatedBy: this.CurrentUser,
              CreatedOn: this.CurrentTimeStamp,
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
        .collection('Mother')
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
          familyIncome: this.PatientsDetails.value.familyIncome,

          AddressLine1: this.PatientsDetails.value.AddressLine1,
          AddressLine2: this.PatientsDetails.value.AddressLine2,
          State: this.PatientsDetails.value.State,
          City: this.PatientsDetails.value.City,
          Pincode: this.PatientsDetails.value.Pincode,

          ChangeddBy: this.CurrentUser,
          ChangedOn: this.CurrentTimeStamp,
        })
        .then(() => {
          this.visible = true;
          console.log('done');
        })
        .catch(function (error) {
          //this.visible = false; 
          console.error('Error writing document: ', error);
        });

      if (this.VaccinesList) {

        let VCLenght = this.VaccinesList.length;
        for (let i = 0; i < VCLenght; i++) {

          let VCID = this.VaccinesList[i].docId;
          console.log(this.VaccinesList[i]);
          this.firestore
            .collection('VaccineDetails')
            .doc('/' + VCID)
            .update({
              Date: this.VaccinesList[i].Date,
              ScheduledOn: this.VaccinesList[i].ScheduledOn,
              Vaccine: this.VaccinesList[i].Vaccine,
              VaccineDetail: this.VaccinesList[i].VaccineDetail,
              patientID: this.VaccinesList[i].patientID,
              ChangeddBy: this.CurrentUser,
              ChangedOn: this.CurrentTimeStamp,
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

      if (this.HistoryList) {

        let MHLenght = this.HistoryList.length;
        for (let i = 0; i < MHLenght; i++) {

          let DataChanged = this.HistoryList[i].DataChanged;
          if (DataChanged == 'NEW') {
            let tmp = DocPath + "/Medical History";
            console.log(this.HistoryList[i]);
            this.firestore
              .collection(tmp)
              .add({
                Disease: this.HistoryList[i].Disease,
                comments: this.HistoryList[i].comments,
                fromDate: this.HistoryList[i].fromDate,
                toDate: this.HistoryList[i].toDate,
                CreatedBy: this.CurrentUser,
                CreatedOn: this.CurrentTimeStamp,
              },)
              .then(res2 => {
                console.log(res2.id);
              }).catch(e => {
                console.log(e);
              });
          }
          else {
            let HSID = this.HistoryList[i].docId;
            let tmp = DocPath + "/Medical History";
            console.log(this.HistoryList[i]);
            this.firestore
              .collection(tmp)
              .doc('/' + HSID)
              .update({
                Disease: this.HistoryList[i].Disease,
                comments: this.HistoryList[i].comments,
                fromDate: this.HistoryList[i].fromDate,
                toDate: this.HistoryList[i].toDate,
                ChangeddBy: this.CurrentUser,
                ChangedOn: this.CurrentTimeStamp,
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
      }


      if (this.PregnancyOutcomeList) {

        let POLenght = this.PregnancyOutcomeList.length;
        for (let i = 0; i < POLenght; i++) {

          let DataChanged = this.PregnancyOutcomeList[i].DataChanged;
          if (DataChanged == 'NEW') {
            let tmp = DocPath + "/Pregnancy Outcome";
            console.log(this.PregnancyOutcomeList[i]);
            this.firestore
              .collection(tmp)
              .add({
                comments: this.PregnancyOutcomeList[i].comments,
                deliveryDate: this.PregnancyOutcomeList[i].deliveryDate,
                deliveryPlace: this.PregnancyOutcomeList[i].deliveryPlace,
                outcome: this.PregnancyOutcomeList[i].outcome,
                CreatedBy: this.CurrentUser,
                CreatedOn: this.CurrentTimeStamp,
              },)
              .then(res2 => {
                console.log(res2.id);
              }).catch(e => {
                console.log(e);
              });
          }
          else {
            let HSID = this.PregnancyOutcomeList[i].docId;
            let tmp = DocPath + "/Pregnancy Outcome";
            console.log(this.PregnancyOutcomeList[i]);
            this.firestore
              .collection(tmp)
              .doc('/' + HSID)
              .update({
                comments: this.PregnancyOutcomeList[i].comments,
                deliveryDate: this.PregnancyOutcomeList[i].deliveryDate,
                deliveryPlace: this.PregnancyOutcomeList[i].deliveryPlace,
                outcome: this.PregnancyOutcomeList[i].outcome,
                ChangeddBy: this.CurrentUser,
                ChangedOn: this.CurrentTimeStamp,
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
      }


      if (this.VisitsList) {

        let VSLenght = this.VisitsList.length;
        for (let i = 0; i < VSLenght; i++) {

          let DataChanged = this.VisitsList[i].DataChanged;
          if (DataChanged == 'NEW') {
            let tmp = DocPath + "/Visit Details";
            console.log(this.VisitsList[i]);
            this.firestore
              .collection(tmp)
              .add({
                LMP: this.VisitsList[i].LMP,
                comments: this.VisitsList[i].comments,
                prescription: this.VisitsList[i].prescription,
                redFlagComments: this.VisitsList[i].redFlagComments,
                signAndSymptoms: this.VisitsList[i].signAndSymptoms,
                visitDate: this.VisitsList[i].visitDate,
                visitedBy: this.VisitsList[i].visitedBy,
                CreatedBy: this.CurrentUser,
                CreatedOn: this.CurrentTimeStamp,
              },)
              .then(res2 => {
                console.log(res2.id);
              }).catch(e => {
                console.log(e);
              });
          }
          else {
            let HSID = this.VisitsList[i].docId;
            let tmp = DocPath + "/Visit Details";
            console.log(this.VisitsList[i]);
            this.firestore
              .collection(tmp)
              .doc('/' + HSID)
              .update({
                LMP: this.VisitsList[i].LMP,
                comments: this.VisitsList[i].comments,
                prescription: this.VisitsList[i].prescription,
                redFlagComments: this.VisitsList[i].redFlagComments,
                signAndSymptoms: this.VisitsList[i].signAndSymptoms,
                visitDate: this.VisitsList[i].visitDate,
                visitedBy: this.VisitsList[i].visitedBy,
                ChangeddBy: this.CurrentUser,
                ChangedOn: this.CurrentTimeStamp,
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
      }


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
    this.PageHS = false;
    this.PagePO = false;
    this.PageVS = false;

    this.FGVaccineDetails.patchValue({ VaccineDetail: this.VaccineDetails.VaccineDetail });
    this.FGVaccineDetails.patchValue({ ScheduledOn: this.VaccineDetails.ScheduledOn });
    this.FGVaccineDetails.patchValue({ Vaccine: this.VaccineDetails.Vaccine });
    this.FGVaccineDetails.patchValue({ patientID: this.VaccineDetails.patientID });
    this.FGVaccineDetails.patchValue({ Date: this.VaccineDetails.Date });

  }

  OnMHistoryDetails(Index: any) {

    this.MHIndex = Index;

    console.log(this.MHistoryDetails);

    this.PagePT = false;
    this.PageVC = false;
    this.PageHS = true;
    this.PagePO = false;
    this.PageVS = false;

    console.log(this.PageHS);
    console.log(this.MHIndex);
    if (this.MHIndex == 'NEW') {
      this.MHistoryDetails = this.FGMHistoryDetails.value;
      //this.MHistoryDetails.Disease = 'NEW';
      //console.log(this.MHistoryDetails.Disease);

      this.FGMHistoryDetails.patchValue({ Disease: '' });
      this.FGMHistoryDetails.patchValue({ comments: '' });
      this.FGMHistoryDetails.patchValue({ fromDate: '' });
      this.FGMHistoryDetails.patchValue({ toDate: '' });
    }
    else {
      this.MHistoryDetails = this.HistoryList[Index];

      this.FGMHistoryDetails.patchValue({ Disease: this.MHistoryDetails.Disease });
      this.FGMHistoryDetails.patchValue({ comments: this.MHistoryDetails.comments });
      this.FGMHistoryDetails.patchValue({ fromDate: this.MHistoryDetails.fromDate });
      this.FGMHistoryDetails.patchValue({ toDate: this.MHistoryDetails.toDate });

    }
  }



  OnPOutcomeDetails(Index: any) {

    this.POIndex = Index;

    console.log(this.POutcomeDetails);

    this.PagePT = false;
    this.PageVC = false;
    this.PageHS = false;
    this.PagePO = true;
    this.PageVS = false;

    console.log(this.PagePO);

    if (this.POIndex == 'NEW') {
      this.POutcomeDetails = this.FGPOutcomeDetails.value;
      //this.POutcomeDetails.deliveryDate = 'NEW';
      // console.log(this.POutcomeDetails.deliveryDate);

      this.FGPOutcomeDetails.patchValue({ comments: '' });
      this.FGPOutcomeDetails.patchValue({ deliveryDate: '' });
      this.FGPOutcomeDetails.patchValue({ deliveryPlace: '' });
      this.FGPOutcomeDetails.patchValue({ outcome: '' });
    }
    else {

      this.POutcomeDetails = this.PregnancyOutcomeList[Index];

      this.FGPOutcomeDetails.patchValue({ comments: this.POutcomeDetails.comments });
      this.FGPOutcomeDetails.patchValue({ deliveryDate: this.POutcomeDetails.deliveryDate });
      this.FGPOutcomeDetails.patchValue({ deliveryPlace: this.POutcomeDetails.deliveryPlace });
      this.FGPOutcomeDetails.patchValue({ outcome: this.POutcomeDetails.outcome });
    }

  }

  OnVisitDetails(Index: any) {

    this.VSIndex = Index;


    //console.log(this.VisitDetails);

    this.PagePT = false;
    this.PageVC = false;
    this.PageHS = false;
    this.PagePO = false;
    this.PageVS = true;

    console.log(this.PageVS);

    if (this.VSIndex == 'NEW') {

      this.VisitDetails = this.FGVisitDetails.value;
      //this.VisitDetails.visitDate = 'NEW';
      //console.log(this.POutcomeDetails.visitDate);
      this.FGVisitDetails.patchValue({ comments: '' });
      this.FGVisitDetails.patchValue({ LMP: '' });
      this.FGVisitDetails.patchValue({ prescription: '' });
      this.FGVisitDetails.patchValue({ visitDate: '' });
      this.FGVisitDetails.patchValue({ visitedBy: '' });
      this.FGVisitDetails.patchValue({ signAndSymptoms: '' });
      this.FGVisitDetails.patchValue({ redFlagComments: '' });
    }
    else {
      this.VisitDetails = this.VisitsList[Index];

      this.FGVisitDetails.patchValue({ comments: this.VisitDetails.comments });
      this.FGVisitDetails.patchValue({ LMP: this.VisitDetails.LMP });
      this.FGVisitDetails.patchValue({ prescription: this.VisitDetails.prescription });
      this.FGVisitDetails.patchValue({ visitDate: this.VisitDetails.visitDate });
      this.FGVisitDetails.patchValue({ visitedBy: this.VisitDetails.visitedBy });
      this.FGVisitDetails.patchValue({ signAndSymptoms: this.VisitDetails.signAndSymptoms });
      this.FGVisitDetails.patchValue({ redFlagComments: this.VisitDetails.redFlagComments });
    }

  }




  OnVCApply() {
    console.log(this.VaccinesList[this.VCIndex]);

    this.VaccinesList[this.VCIndex].VaccineDetail = this.FGVaccineDetails.value.VaccineDetail;
    this.VaccinesList[this.VCIndex].ScheduledOn = this.FGVaccineDetails.value.ScheduledOn;
    this.VaccinesList[this.VCIndex].Vaccine = this.FGVaccineDetails.value.Vaccine;
    this.VaccinesList[this.VCIndex].patientID = this.FGVaccineDetails.value.patientID;
    this.VaccinesList[this.VCIndex].Date = this.FGVaccineDetails.value.Date;
    this.VaccinesList[this.VCIndex].DataChanged = 'CHANGE';



    this.onSelectVaccines(this.FGVaccineDetails.value.patientID);
    // this.PagePT = true;
    // this.PageVC = false;

    // this.Vaccines = true;
    // this.Details = false;
  }

  OnHCApply() {

    if (this.MHIndex == 'NEW') {
      this.MHIndex = this.HistoryList.length;
      this.HistoryList[this.MHIndex] = this.FGMHistoryDetails.value;
      this.HistoryList[this.MHIndex].DataChanged = 'NEW';
    }

    if (this.HistoryList[this.MHIndex].DataChanged != 'NEW') {
      this.HistoryList[this.MHIndex].DataChanged = 'CHANGE';
    }

    this.HistoryList[this.MHIndex].Disease = this.FGMHistoryDetails.value.Disease;
    this.HistoryList[this.MHIndex].comments = this.FGMHistoryDetails.value.comments;
    this.HistoryList[this.MHIndex].fromDate = this.FGMHistoryDetails.value.fromDate;
    this.HistoryList[this.MHIndex].toDate = this.FGMHistoryDetails.value.toDate;


    this.onSelectHistory(this.Ptid);

  }

  OnPOApply() {

    if (this.POIndex == 'NEW') {
      this.POIndex = this.PregnancyOutcomeList.length;
      this.PregnancyOutcomeList[this.POIndex] = this.FGPOutcomeDetails.value;
      this.PregnancyOutcomeList[this.POIndex].DataChanged = 'NEW';
    }

    if (this.PregnancyOutcomeList[this.POIndex].DataChanged != 'NEW') {
      this.PregnancyOutcomeList[this.POIndex].DataChanged = 'CHANGE';
    }

    this.PregnancyOutcomeList[this.POIndex].comments = this.FGPOutcomeDetails.value.comments;
    this.PregnancyOutcomeList[this.POIndex].deliveryDate = this.FGPOutcomeDetails.value.deliveryDate;
    this.PregnancyOutcomeList[this.POIndex].deliveryPlace = this.FGPOutcomeDetails.value.deliveryPlace;
    this.PregnancyOutcomeList[this.POIndex].outcome = this.FGPOutcomeDetails.value.outcome;

    this.onSelectPregnancyOutcome(this.Ptid);

  }

  OnVSApply() {

    if (this.VSIndex == 'NEW') {
      this.VSIndex = this.VisitsList.length;
      this.VisitsList[this.VSIndex] = this.FGVisitDetails.value;
      this.VisitsList[this.VSIndex].DataChanged = 'NEW';
    }

    if (this.VisitsList[this.VSIndex].DataChanged != 'NEW') {
      this.VisitsList[this.VSIndex].DataChanged = 'CHANGE';
    }


    this.VisitsList[this.VSIndex].comments = this.FGVisitDetails.value.comments;
    this.VisitsList[this.VSIndex].LMP = this.FGVisitDetails.value.LMP;
    this.VisitsList[this.VSIndex].prescription = this.FGVisitDetails.value.prescription;
    this.VisitsList[this.VSIndex].visitDate = this.FGVisitDetails.value.visitDate;
    this.VisitsList[this.VSIndex].visitedBy = this.FGVisitDetails.value.visitedBy;
    this.VisitsList[this.VSIndex].signAndSymptoms = this.FGVisitDetails.value.signAndSymptoms;
    this.VisitsList[this.VSIndex].redFlagComments = this.FGVisitDetails.value.redFlagComments;

    this.onSelectVisits(this.Ptid);


  }


  ShowChilds(PTID: any, PTNAME: any) {
    this.router.navigate(['/Childs', PTID, PTNAME]);
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
        .collection('Mother')
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

            this.PatientsDetails.patchValue({ AddressLine1: this.patient.AddressLine1 });
            this.PatientsDetails.patchValue({ AddressLine2: this.patient.AddressLine2 });
            this.PatientsDetails.patchValue({ State: this.patient.State });
            this.PatientsDetails.patchValue({ City: this.patient.City });
            this.PatientsDetails.patchValue({ Pincode: this.patient.Pincode });

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
