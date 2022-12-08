import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  public user:any;
  public userDTL:any;
  public Name : any;
  AppPage:boolean = true;
  visible:boolean = false;

  constructor(public authService: AuthServiceService) {}
  
  

  SignOut(){
    this.authService.SignOut();
    this.visible = false;
  }
  

  
  onclick()
  {
    
     this.userDTL = JSON.parse(localStorage.getItem('userDTL')!);
      console.log(this.userDTL);
      this.Name = this.userDTL.firstName + " " + this.userDTL.lastName;
    this.visible = !this.visible
  }
}
