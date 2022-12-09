import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Validation from '../utils/validation';

@Component({
  selector: 'app-maintain-user',
  templateUrl: './maintain-user.component.html',
  styleUrls: ['./maintain-user.component.css']
})

export class MaintainUserComponent implements OnInit {

  public UserDetails: any;
  public Uid:any;
  public UName:any;
  visible: boolean = false;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder) { }


    FGUserDetails = new FormGroup(
      {
              
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        mobileNumber: new FormControl(''),
        EmailID: new FormControl(''),
        UserType: new FormControl(''),
      }
    );

  submitted = false;

  get f(): { [key: string]: AbstractControl } {
    return this.FGUserDetails.controls;
  }


  ngOnInit(): void {

    this.FGUserDetails = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        EmailID: ['', Validators.required],
        UserType: ['', Validators.required],
      });

    let id = this.route.snapshot.paramMap.get('id');
    this.Uid = id;

    if (this.Uid === 'New') {
      this.UName = "New";
    }
    else {
     

      this.firestore
        .collection('Users')
        .doc(this.Uid).ref.get().then((doc) => {
          if (doc.exists) {
            console.log("Document data: ", doc.data());
            this.UserDetails = doc.data();
            this.UName = this.UserDetails.firstName;
            // console.log(this.patient);

            this.FGUserDetails.patchValue({ UserType: this.UserDetails.UserType });
            this.FGUserDetails.patchValue({ firstName: this.UserDetails.firstName });
            this.FGUserDetails.patchValue({ lastName: this.UserDetails.lastName });
            this.FGUserDetails.patchValue({ mobileNumber: this.UserDetails.mobileNumber });
            this.FGUserDetails.patchValue({ EmailID: this.UserDetails.EmailID });
           
          }
        })


    }


  }

  OnSave(){

    this.submitted = true;

    if (this.FGUserDetails.invalid) {
      return;
    }

    if (this.Uid === 'New') {
      this.firestore
        .collection('Users')
        .add({
          firstName: this.FGUserDetails.value.firstName,
          lastName: this.FGUserDetails.value.lastName,
          UserType: this.FGUserDetails.value.UserType,
          EmailID: this.FGUserDetails.value.EmailID,
          mobileNumber: this.FGUserDetails.value.mobileNumber,
        })
        .then(res => {
          const id = res.id;
          this.Uid = res.id;
          this.visible = true;
          this.router.navigate(['/UserDetail', id]);
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
    else{
      this.firestore
      .collection('Users')
      .doc('/' + this.Uid)
      .update({
        firstName: this.FGUserDetails.value.firstName,
          lastName: this.FGUserDetails.value.lastName,
          UserType: this.FGUserDetails.value.UserType,
          EmailID: this.FGUserDetails.value.EmailID,
          mobileNumber: this.FGUserDetails.value.mobileNumber,
        })
        .then(() => {
          this.visible = true;
          console.log('done');
        })
        .catch(function (error) {
          //this.visible = false; 
          console.error('Error writing document: ', error);
        });

    }

  }
}
