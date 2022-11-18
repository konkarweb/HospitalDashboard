import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Query } from '@firebase/firestore-types';
import { PatientsComponent } from './patients/patients.component';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  public Vaccine: any;
  private _url:string = "http://localhost:8080/api/getAllPatient";
  private _urlSingle:string = "http://localhost:8080/api/getPatientById?patientId=";
  private _urlSavept:string = "http://localhost:8080/api/createPatient";

  constructor(private http: HttpClient,
   // private _Query: Query,
    private firestore: AngularFirestore)
    { 
    //  this.Vaccine =  this.firestore
    //  .collection("MotherVaccineDetails")
    //  .valueChanges({ idField: 'docId' });

   }

   getVaccine(Ptid:any):Observable<[]>{

    this.Vaccine = this.firestore
     .collection("MotherVaccineDetails",ref => {
       let query: Query = ref;
       { query = query.where('patientID', '==', Ptid) };
       return query; })
     .valueChanges({ idField: 'docId' });

      return this.Vaccine;
    // return this.http.post<any>(this._urlSavept, PatientData);
  }
}


