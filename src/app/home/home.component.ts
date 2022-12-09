import { Component, OnInit } from '@angular/core';
import { VacReportService } from '../vac-report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public userDTL: any;
  public UpcmngMap: any;
  public VACUPC: any;

  public UpcmngList: any;
  public ChildList: any;
  public MotherList: any;

  public childCount: any;
  public motherCount: any;
  
  SuperAdmin:boolean = false;
  constructor(
    private _VacReportService: VacReportService
  ) { }

  ngOnInit(): void {

    this._VacReportService.getUpcmg()
    .subscribe((v:any) => {
      this.UpcmngList = v;
      console.log(this.UpcmngList);

      this._VacReportService.getMother()
      .subscribe((v:any) => {
        this.MotherList= v;
       // console.log(this.MotherList);
       this.motherCount = this.MotherList.length;
      })
  
      this._VacReportService.getChild()
      .subscribe((v:any) => {
        this.ChildList = v;
       // console.log(this.ChildList);
       this.childCount = this.ChildList.length;
  
      })

      this.UpcmngList.forEach((Upcmng:any) => {
             this.UpcmngMap[Upcmng.patientID] = Upcmng;

            //  this.persons =  this.personService.getPersons().filter(x => x.id == this.personId)[0];
         })

        

    //   this.UpcmngList.forEach((Upcmng:any) => {
    //     this.UpcmngMap[Upcmng.patientID] = Upcmng;
    // })
    
    // this.VACUPC = this.MotherList.map((Mother:any) => {
    //      return {
    //       Mother: Mother,
    //          Vac: this.UpcmngMap[Mother.docId]
    //      };
    // });

    console.log(this.VACUPC);

    })

 

    //debugger;
    this._VacReportService.getUpcmg();

    this.userDTL = JSON.parse(localStorage.getItem('userDTL')!);
    console.log(this.userDTL);
    if( this.userDTL.UserType == 'Admin'){
      this.SuperAdmin = true;
    } 
    else{
      this.SuperAdmin = false;
    }
  }

}
