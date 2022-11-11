import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VaccineService } from '../vaccine.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

//  interface PTT{
//    firstname: string,
//    ID: string
//  };



@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {

  public VaccinesList:any;




 
  constructor( private router: Router,
               private _vaccineService: VaccineService ) { 
         
                
              }

            

 
             
  ngOnInit(): void {
    this._vaccineService.getVaccine()
    .subscribe((v:any) => {
      this.VaccinesList = v;
      console.log(this.VaccinesList);
    })
    


  }

  OnSelect(vaccine: any){
    this.router.navigate(['/Vaccine', vaccine.docId]);

  }

  OnNew(){
    
  }
  

}

