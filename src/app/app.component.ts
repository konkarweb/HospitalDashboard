import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  public user:any;
  AppPage:boolean = true;

  constructor(public authService: AuthServiceService,
    public router: Router) {}


    
  ngOnInit(): void {

  }

  visible:boolean = false;
  onclick()
  {
   
    this.visible = !this.visible
  }
}
