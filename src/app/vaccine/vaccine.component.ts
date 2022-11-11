import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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

  public VaccinesList: any;
  public VaccinesListTmp: any;
  public Ptid: any;
  public PtName: any;
  public patient: any;



  constructor(private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private _vaccineService: VaccineService) {


  }





  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.Ptid = id;

    this.firestore
      .collection('Patients')
      .doc(this.Ptid).ref.get().then((doc) => {
        if (doc.exists) {
          //console.log("Document data: ", doc.data());
          this.patient = doc.data();
          this.PtName = this.patient.firstName;

        }
      })
    this._vaccineService.getVaccine()
      .subscribe((v: any) => {
        this.VaccinesList = v;

             
        console.log(this.VaccinesList);
      })

      console.log(this.VaccinesList);

  }

  // OnSelect(vaccine: any) {
  //   this.router.navigate(['/Vaccine', vaccine.docId]);

  // }

  OnNew() {

  }

  // filterVaccine(PatientId: any){
  //   return this.VaccinesList.filter((x: { patientID: any; }) => x.patientID == PatientId );
  // }

}

