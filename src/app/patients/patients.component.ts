import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientsService } from '../patients.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

//  interface PTT{
//    firstname: string,
//    ID: string
//  };



@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  public PatientsList:any;
  public itemsTemp:any;
  //items: Observable<any[]>;

  //PTTT: PTT[]; 

 patients = [
  {"Id": "1", "Fname" : "Rama", "Lname" : "Sharma", "Age": "31", "Contact_No": "8767678987" },
  {"Id": "2", "Fname" : "Kanta", "Lname" : "Shaha", "Age": "27", "Contact_No": "8876547890" },
  {"Id": "3", "Fname" : "Reshma", "Lname" : "Gupta", "Age": "29", "Contact_No": "9898564534" }
 ];

 
  constructor( private router: Router,
               private _paitentsService: PatientsService ) { 
             //   this.items = firestore.collection('/Patients/0xPyvLrrn8bG18rNsfxo/Medical History').valueChanges();
                
              }

            

 
             
  ngOnInit(): void {

    this._paitentsService.getUsers()
    .subscribe((v:any) => {
      this.PatientsList = v;
      console.log(this.PatientsList);

    })
    


  }

  OnSelect(patient: any){
    this.router.navigate(['/Patient', patient.docId]);

  }

  OnNew(){
    this.router.navigate(['/Patient', 'New']);
  }

}
