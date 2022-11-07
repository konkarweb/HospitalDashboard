import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildService } from '../child.service';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  public ChildList:any;
  constructor( private router: Router, private _childService: ChildService ) { }

  ngOnInit(): void {
    this._childService.getUsers()
    .subscribe((v:any) => {
      this.ChildList = v;
      console.log(this.ChildList);
    })
    
  }

  OnNewChild(){
    this.router.navigate(['/Child', 'New']);
  }
  OnSelect(patient: any){
    this.router.navigate(['/Patient', patient.patientId]);

  }
}
