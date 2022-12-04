import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { AuthServiceService } from 'src/app/auth-service.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public user: any;
  public UserName: any;
  public Password: any;
  public UserDetl: any;
  ShowPass: boolean = false;
  ShowEmail: boolean = true;
  ShowSignIn: boolean = false;
  ShowSignUp: boolean = false;
  ShowNext: boolean = true;
  InvalidEmail: boolean = false;



  constructor(public authService: AuthServiceService,
    public UserService : UserService,
    private firestore: AngularFirestore,
    public router: Router) { }

  FGLogin = new FormGroup(
    {
      UserName: new FormControl(''),
      Password: new FormControl('')
    }
  )

  onEmailValidation() {

     
      this.UserService.getLoginUser(this.FGLogin.value.UserName).subscribe((v: any) => {
        this.UserDetl = v;
      });

      this.UserService.getLoginUser(this.FGLogin.value.UserName)
        .subscribe((v: any) => {
          this.UserDetl = v[0];

          console.log(this.UserDetl);

          if(!this.UserDetl) {
            this.InvalidEmail = true;
          }
          else{
            this.InvalidEmail = false;
            console.log(this.UserDetl);
            if (this.UserDetl.Status == 'Active') {
              this.ShowSignIn = true;
              this.ShowSignUp = false;
              console.log('Active');
            }
            else {
              this.ShowSignIn = false;
              this.ShowSignUp = true;
              console.log('IN Active');
            }
      
            this.UserName = this.FGLogin.value.UserName;
      
            this.ShowPass = true;
            this.ShowEmail = false;
            this.ShowNext = false;
          }
        })

    
  

  }

  SignIn(UserName:any, Password:any){
    
    let PasswordTmp:string = this.FGLogin.value.Password + "";
    console.log(UserName, PasswordTmp);

    this.authService.SignIn(UserName, PasswordTmp);
  }

  SignUp(UserName:any, Password:any){

    let PasswordTmp:string = this.FGLogin.value.Password + "";
    console.log(UserName, PasswordTmp);

    this.firestore
        .collection('Users')
        .doc('/' + this.UserDetl.docId)
        .update({
          Status: 'Active',
        })
        .then(() => {
          console.log('done');
        })
        .catch(function (error) {
          //this.visible = false; 
          console.error('Error writing document: ', error);
        });

    this.authService.SignUp(UserName, PasswordTmp);


  }
  

  ngOnInit(): void {

    console.log(JSON.parse(localStorage.getItem('user')!));
    this.user = JSON.parse(localStorage.getItem('user')!);
    if (!this.user) {

    }
    else {
      this.router.navigate([''])
    }
  }

}
