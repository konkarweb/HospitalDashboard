import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildService } from '../child.service';
import { FormControl,  FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { VaccineService } from '../vaccine.service';
import Validation from '../utils/validation';

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
  has_parent: boolean = false;

  public patient: any;
  public SLpatient: any;
  public PatientsList: any;
  public VaccinesList: any;
  public VaccinesListTmp: any;
  public PatientsDetailsTmp: any;

  public CurrentTimeStamp: any;
  public CurrentUser: any;



  Details: Boolean = true;
  DetailsChanged: Boolean = false;
  Vaccines: Boolean = false;
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
  CallFromMother: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _paitentsService: ChildService,
    private firestore: AngularFirestore,
    private _vaccineService: VaccineService,
    private formBuilder: FormBuilder) {

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
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.ChildDetails.controls;
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




  FGVisitDetails = new FormGroup(
    {
      comments: new FormControl(''),
      visitedBy: new FormControl(''),
      visitDate: new FormControl(''),
      signAndSymptoms: new FormControl(''),
      redFlagComments: new FormControl(''),
      prescription: new FormControl(''),
      Weight: new FormControl(''),
      Height: new FormControl(''),
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

    console.log(PatientID);

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

  onSelect(ChildID: any) {
    // console.log(Patient);
    this.router.navigate(['/Vaccines', ChildID]);
  }



  OnSave() {

    this.submitted = true;

    if (this.ChildDetails.invalid) {
      return;
    }

    this.CurrentTimeStamp = this.CurrentTimeStampGet();
    this.CurrentUser = 'wVYbQJ43GSfHLtZ7DSYA';
    let DocPath = "/Childs/" + this.Ptid;

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
          this.Ptid = res.id;
          this.ChangeMode = true;

          if (this.CallFromMother) {
            this.router.navigate(['/Child', this.MotherID, this.MotherName, id]);
          }
          else {
            this.router.navigate(['/Child', id]);
          }

          console.log(res);

          this.firestore
            .collection('VaccineDetails')
            .add({
              patientID: id,
              Sq: 1,
              ScheduledOn: "",
              Date: "",
              Vaccine: "DTP 1,2 3",
              VaccineDetail: "At 6 Weeks, 10 Weeks 14 Weeks",
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
              Vaccine: "BCG",
              VaccineDetail: "At birth or as early as possible till one year of age",
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
              Vaccine: "Hepatitis",
              VaccineDetail: "At birth or as early as possible within 24 hours",
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
                  Weight: this.VisitsList[i].Weight,
                  Height: this.VisitsList[i].Height,
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
                  Weight: this.VisitsList[i].Weight,
                  Height: this.VisitsList[i].Height,
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
      this.FGVisitDetails.patchValue({ Weight: '' });
      this.FGVisitDetails.patchValue({ Height: '' });
      this.FGVisitDetails.patchValue({ prescription: '' });
      this.FGVisitDetails.patchValue({ visitDate: '' });
      this.FGVisitDetails.patchValue({ visitedBy: '' });
      this.FGVisitDetails.patchValue({ signAndSymptoms: '' });
      this.FGVisitDetails.patchValue({ redFlagComments: '' });
    }
    else {
      this.VisitDetails = this.VisitsList[Index];

      this.FGVisitDetails.patchValue({ comments: this.VisitDetails.comments });
      this.FGVisitDetails.patchValue({ Weight: this.VisitDetails.Weight });
      this.FGVisitDetails.patchValue({ Height: this.VisitDetails.Height });
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
    this.VisitsList[this.VSIndex].Weight = this.FGVisitDetails.value.Weight;
    this.VisitsList[this.VSIndex].Height = this.FGVisitDetails.value.Height;
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

  OnSelectMother(PTID: any) {
    this.router.navigate(['/Patient', PTID]);

  }

  ngOnInit(): void {

    this.ChildDetails = this.formBuilder.group(
      {
        ChildId: [''],
        patientType: ['', Validators.required],
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        MiddleName: ['', Validators.required],
        BloodGroup: ['', Validators.required],
        MobileNumber: ['', Validators.required],
        DOB: ['', Validators.required],
        Gender: ['', Validators.required],
        BirthHeadCircumference: ['', Validators.required],
        BirthHeight: ['', Validators.required],
        BirthWeight: ['', Validators.required],
        MotherID: ['', Validators.required],
      }
    );

    let id = this.route.snapshot.paramMap.get('id');
    this.MotherID = this.route.snapshot.paramMap.get('MTid');
    this.MotherName = this.route.snapshot.paramMap.get('MTname');
    this.Ptid = id;

    if (!this.MotherID) {
      this.CallFromMother = false;
    }
    else {
      this.CallFromMother = true;
    }

    if (this.Ptid === 'New') {
      this.PtName = "New";
      this.ChildDetails.patchValue({ ChildId: this.Ptid });
      this.ChildDetails.patchValue({ MotherID: this.MotherID });
    }
    else {
      this.ChangeMode = true;

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
            this.ChildDetails.patchValue({ MotherID: this.child.MotherID });
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
