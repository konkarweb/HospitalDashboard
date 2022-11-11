import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {


  public HistoryDetails : any;
  public History: any;
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(History: any){

  }
  onNew(){
    
  }

}
