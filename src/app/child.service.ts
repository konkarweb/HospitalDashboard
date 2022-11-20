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

  getUsers():Observable<IPatients[]>{
    return this.http.get<IPatients[]>(this._url);
  }

  getSingleUser(id:any):Observable<IPatients[]>{
    let tmp = this._urlSingle + encodeURIComponent(id);
    return this.http.get<IPatients[]>( tmp );

  }
  SavePatient(PatientData:any){
    return this.http.post<any>(this._urlSavept, PatientData);
  }
}
