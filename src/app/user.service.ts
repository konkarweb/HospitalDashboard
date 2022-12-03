import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public Users: any;

  constructor( private http: HttpClient,
    private firestore: AngularFirestore) { }


    getUsersCount():Observable<[]>{
      this.Users =  this.firestore
      .collection("Users")
      .valueChanges();
    return this.Users;
    }


    getUsers():Observable<[]>{
      // return this.http.get<IPatients[]>(this._url);
      this.Users =  this.firestore
        .collection("Users")
        .valueChanges({ idField: 'docId' });
      return this.Users;
    }
}
