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
  public UpcmngListFinal: any;

  public DueList:any;
  public DueListFinal: any;

  
  public ChildList: any;
  public MotherList: any;
  public TempData: any;

  public childCount: any;
  public motherCount: any;

  SuperAdmin: boolean = false;
  constructor(
    private _VacReportService: VacReportService
  ) { }

  ngOnInit(): void {

    this._VacReportService.getUpcmg()
      .subscribe((v: any) => {
        this.UpcmngList = v;
        console.log(this.UpcmngList);

        this._VacReportService.getMother()
          .subscribe((v: any) => {
            this.MotherList = v;
            // console.log(this.MotherList);
            this.motherCount = this.MotherList.length;


            this._VacReportService.getChild()
              .subscribe((v: any) => {
                this.ChildList = v;
                // console.log(this.ChildList);
                this.childCount = this.ChildList.length;
                let i = 0;

                this.UpcmngListFinal = this.UpcmngList;
                this.UpcmngList.forEach((Upcmng: any) => {


                  this.TempData = this.MotherList.filter((x: { docId: any; }) => x.docId == Upcmng.patientID)[0];

                  if (this.TempData) {

                    this.UpcmngListFinal[i].FirstName = this.TempData.firstName;
                    this.UpcmngListFinal[i].LastName = this.TempData.lastName;
                    console.log(this.UpcmngListFinal[i]);
                  }
                  else {

                    this.TempData = this.ChildList.filter((x: { docId: any; }) => x.docId == Upcmng.patientID)[0];

                    this.UpcmngListFinal[i].FirstName = this.TempData.FirstName;
                    this.UpcmngListFinal[i].LastName = this.TempData.LastName;
                    console.log(this.UpcmngListFinal[i]);
                  }


                  i = i + 1;

                })

              })



          })



      })


    this._VacReportService.getDue()
      .subscribe((v: any) => {
        this.DueList = v;
        console.log(this.DueList);

        this._VacReportService.getMother()
          .subscribe((v: any) => {
            this.MotherList = v;
            // console.log(this.MotherList);
            this.motherCount = this.MotherList.length;


            this._VacReportService.getChild()
              .subscribe((v: any) => {
                this.ChildList = v;
                // console.log(this.ChildList);
                this.childCount = this.ChildList.length;
                let i = 0;

                this.DueListFinal = this.DueList;
                this.DueList.forEach((Due: any) => {

                  if(Due.ScheduledOn > 0)
                  {
                  
                  this.TempData = this.MotherList.filter((x: { docId: any; }) => x.docId == Due.patientID)[0];

                  if (this.TempData) {

                    this.DueListFinal[i].FirstName = this.TempData.firstName;
                    this.DueListFinal[i].LastName = this.TempData.lastName;
                    console.log(this.DueListFinal[i]);
                  }
                  else {

                    this.TempData = this.ChildList.filter((x: { docId: any; }) => x.docId == Due.patientID)[0];

                    this.DueListFinal[i].FirstName = this.TempData.FirstName;
                    this.DueListFinal[i].LastName = this.TempData.LastName;
                    console.log(this.DueListFinal[i]);
                  }


                  i = i + 1;

                }
              })
                
                

              })



          })



      })



    //debugger;
    this._VacReportService.getUpcmg();

    this.userDTL = JSON.parse(localStorage.getItem('userDTL')!);
    console.log(this.userDTL);
    if (this.userDTL.UserType == 'Admin') {
      this.SuperAdmin = true;
    }
    else {
      this.SuperAdmin = false;
    }
  }

}
