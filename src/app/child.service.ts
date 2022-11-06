import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatients } from './patients';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private _url:string = "http://localhost:8080/api/getAllPatient";
  private _urlSingle:string = "http://localhost:8080/api/getPatientById?patientId=";
  private _urlSavept:string = "http://localhost:8080/api/createPatient";
  constructor(private http: HttpClient) { }

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
