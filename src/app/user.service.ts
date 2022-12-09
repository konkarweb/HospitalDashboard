import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public Users: any;
  public UserDtl: any;

  constructor(private http: HttpClient,
    private firestore: AngularFirestore) { }


  getUsersCount(): Observable<[]> {
    this.Users = this.firestore
      .collection("Users")
      .valueChanges();
    return this.Users;
  }

  getLoginUser(UserName: any): Observable<[]> {
    console.log(UserName);
    this.UserDtl = this.firestore
      .collection("Users", ref => ref.where('EmailID', '==', UserName))
      .valueChanges({ idField: 'docId' });

    return this.UserDtl;
  }

  getUsers(): Observable<[]> {
    // return this.http.get<IPatients[]>(this._url);
    this.Users = this.firestore
      .collection("Users")
      .valueChanges({ idField: 'docId' });
    return this.Users;
  }
}
