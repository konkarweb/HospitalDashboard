import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public user: any;

  constructor(public authService: AuthServiceService,
              public router: Router) { }

  ngOnInit(): void {
    
    console.log (JSON.parse(localStorage.getItem('user')!));
    this.user = JSON.parse(localStorage.getItem('user')!);
    if(!this.user){

    }
    else{
      this.router.navigate([''])
    }
  }

}
