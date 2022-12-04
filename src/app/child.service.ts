import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatients } from './patients';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Query } from '@firebase/firestore-types';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

 
  public Childs: any;
  public Patients: any;
  public MedicalHistory:any;
  public PregnancyOutcome:any;
  public Visits:any;
  
  private _url:string = "http://localhost:8080/api/getAllPatient";
  private _urlSingle:string = "http://localhost:8080/api/getPatientById?patientId=";
  private _urlSavept:string = "http://localhost:8080/api/createPatient";
  constructor(private http: HttpClient,
              private firestore: AngularFirestore) {

               }

  get_Childs(){
    this.Childs = this.firestore
    .collection("Childs")
    .valueChanges({ idField: 'docId' });

  return this.Childs;
  }

  getChildsByMother(MTid:any){

    this.Childs = this.firestore
     .collection("Childs",ref => {
       let query: Query = ref;
       { query = query.where('MotherID', '==', MTid) };
       return query; })
     .valueChanges({ idField: 'docId' });
      //console.log(this.Childs);
     return this.Childs;
    // return this.http.post<any>(this._urlSavept, PatientData);
  }

  getPatientsCount():Observable<[]>{     
    this.Patients =  this.firestore
    .collection("Mother")
    .valueChanges();
    return this.Patients.length;
  }

getUsers():Observable<IPatients[]>{
  // return this.http.get<IPatients[]>(this._url);
  this.Patients =  this.firestore
    .collection("Mother")
    .valueChanges({ idField: 'docId' });
  return this.Patients;
}


getMedicalHistory(PTid:any):Observable<[]>{
  // return this.http.get<IPatients[]>(this._url);
  let tmp = "/Childs/" + PTid + "/Medical History";
  console.log(tmp);
  this.MedicalHistory =  this.firestore
    .collection(tmp)
    .valueChanges({ idField: 'docId' });
  return this.MedicalHistory;
}

getPregnancyOutcome(PTid:any):Observable<[]>{
  // return this.http.get<IPatients[]>(this._url);
  let tmp = "/Childs/" + PTid + "/Pregnancy Outcome";
  console.log(tmp);
  this.PregnancyOutcome =  this.firestore
    .collection(tmp)
    .valueChanges({ idField: 'docId' });
  return this.PregnancyOutcome;
}

getVisits(PTid:any):Observable<[]>{
  // return this.http.get<IPatients[]>(this._url);
  let tmp = "/Childs/" + PTid + "/Visit Details";
  console.log(tmp);
  this.Visits =  this.firestore
    .collection(tmp)
    .valueChanges({ idField: 'docId' });
  return this.Visits;
}


  getSingleUser(id:any):Observable<IPatients[]>{
    let tmp = this._urlSingle + encodeURIComponent(id);
    return this.http.get<IPatients[]>( tmp );

  }
  SavePatient(PatientData:any){
    return this.http.post<any>(this._urlSavept, PatientData);
  }
}
