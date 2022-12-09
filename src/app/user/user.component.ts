import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  public UsersList: any;


  constructor(private router: Router,private _userService: UserService) { }

  ngOnInit(): void {

    this._userService.getUsers()
    .subscribe((v:any) => {
      this.UsersList = v;
      console.log(this.UsersList);
    })

  }

  OnSelect(user: any){
   
    this.router.navigate(['/UserDetail', user.docId]);

  }

  OnNew(){
    this.router.navigate(['/UserDetail', 'New']);
  }

}
