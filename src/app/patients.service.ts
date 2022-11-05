import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatients } from './patients';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private _url:string = "http://localhost:8080/api/getAllPatient";
  private _urlSingle:string = "http://localhost:8080/api/getPatientById?patientId=";

  constructor(private http: HttpClient) { }

  getUsers():Observable<IPatients[]>{
    return this.http.get<IPatients[]>(this._url);
  }

  getSingleUser(id:any):Observable<IPatients[]>{
    return this.http.get<IPatients[]>( this._urlSingle + id );

  }
}
