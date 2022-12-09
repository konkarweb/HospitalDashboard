import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Query } from '@firebase/firestore-types';

@Injectable({
  providedIn: 'root'
})
export class VacReportService {

  constructor(private http: HttpClient,
    private firestore: AngularFirestore) { }

    public UpcmgDtl:any;
    public DueDtl:any;
    public MotherList:any;
    public ChildList:any;


    getUpcmg(): Observable<[]> {
    
      this.UpcmgDtl = this.firestore
        .collection("VaccineDetails", ref => ref.where('ScheduledOn', '>=', '2022-12-09'))
        .valueChanges({ idField: 'docId' });
  
        return this.UpcmgDtl;


    }


    getDue(): Observable<[]> {
    
      this.DueDtl = this.firestore
        .collection("VaccineDetails", ref => ref.where('ScheduledOn', '<', '2022-12-09'))
        .valueChanges({ idField: 'docId' });

       
         //console.log(this.Childs);
         return this.DueDtl;

       


    }



    getMother(): Observable<[]> {
    
      this.MotherList = this.firestore
        .collection("Mother")
        .valueChanges({ idField: 'docId' });
  
        return this.MotherList;

    }


    getChild(): Observable<[]> {
    
      this.ChildList = this.firestore
        .collection("Childs")
        .valueChanges({ idField: 'docId' });
  
        return this.ChildList;


    }

}
