import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaccineDetailsTableService {

  constructor(private http: HttpClient) { 

  }

  getChildCompletedVaccineData(): Observable<any> {
    return this.http.get('http://localhost:3000/VaccineTaken');
  }

  getChildDueVaccineData(): Observable<any> {
    return this.http.get('http://localhost:3000/DueVaccine');
  }

  getChildUpcomingVaccineData(): Observable<any> {
    return this.http.get('http://localhost:3000/UpcomingVaccine');
  }


  getParentCompletedVaccineData(): Observable<any> {
    return this.http.get('http://localhost:3000/ParentVaccineTaken');
  }

  getParentDueVaccineData(): Observable<any> {
    return this.http.get('http://localhost:3000/ParentDueVaccine');
  }

  getParentUpcomingVaccineData(): Observable<any> {
    return this.http.get('http://localhost:3000/ParentUpcomingVaccine');
  }


}
