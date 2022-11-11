import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatients } from './patients';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  public Patients: any;
  private _url:string = "http://localhost:8080/api/getAllPatient";
  private _urlSingle:string = "http://localhost:8080/api/getPatientById?patientId=";
  private _urlSavept:string = "http://localhost:8080/api/createPatient";
  constructor(private http: HttpClient,
     private firestore: AngularFirestore)
     { 
      this.Patients =  this.firestore
      .collection("Patients")
      .valueChanges({ idField: 'docId' });
    }

  getUsers():Observable<IPatients[]>{
    // return this.http.get<IPatients[]>(this._url);
    return this.Patients;
  }

  getSingleUser(id:any):Observable<IPatients[]>{
    let tmp = this._urlSingle + encodeURIComponent(id);
    return this.http.get<IPatients[]>( tmp );

  }
  SavePatient(PatientData:any){
    return this.http.post<any>(this._urlSavept, PatientData);
  }
}
