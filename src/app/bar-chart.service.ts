import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarChartService {

  constructor(private http: HttpClient) { }


  getParentChildBar(): Observable<any> {

    return this.http.get('http://localhost:3000/ParentChildBar');
  }

  // getChildCompletedVaccineData(): Observable<any> {
    // return this.http.get('http://localhost:3000/VaccineTaken');
  // }
}
