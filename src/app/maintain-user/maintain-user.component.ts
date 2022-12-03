import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maintain-user',
  templateUrl: './maintain-user.component.html',
  styleUrls: ['./maintain-user.component.css']
})
export class MaintainUserComponent implements OnInit {


  public UserDetails: any;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore) { }


    PatientsDetails = new FormGroup(
      {
        userId: new FormControl(''),
       
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        middleName: new FormControl(''),
       
        mobileNumber: new FormControl(''),
        alternateNumber: new FormControl(''),
        emailId: new FormControl(''),
        
        uid: new FormControl(''),
      
        dob: new FormControl(''),
       
        DataChanged: new FormControl(''),
      }
    );


  ngOnInit(): void {
  }

}
