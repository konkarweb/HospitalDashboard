import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildService } from '../child.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  public ChildList: any;
  public Ptid: any;
  public PtName: any;
  CallFromMother: boolean = false;

  constructor(private router: Router, private _childService: ChildService,
    private firestore: AngularFirestore,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('PTid');
    let name = this.route.snapshot.paramMap.get('PTname');
    this.Ptid = id;
    this.PtName = name;
    if (!this.Ptid) {
      this.CallFromMother = false;

      this._childService.get_Childs()
        .subscribe((v: any) => {
          this.ChildList = v;
          //console.log(v);
          //console.log(this.ChildList);
        })
    }
    else {
      this.CallFromMother = true;

      this._childService.getChildsByMother(id)
        //this._childService.get_Childs()
        .subscribe((v: any) => {
          this.ChildList = v;
          //console.log(v);
          console.log(this.ChildList);
        })
    }
    console.log(this.Ptid);

  }

  OnNewChild(PTID: any, MTNAME: any) {
    if (!PTID) {
      this.router.navigate(['/Child', 'New']);
    }
    else {
      this.router.navigate(['/Child', PTID, MTNAME, 'New']);
    }
  }

  OnSelect(child: any, PTID: any, MTNAME: any) {
   
    if (!PTID) {
      this.router.navigate(['/Child', child.docId]);
    }
    else {
      this.router.navigate(['/Child', PTID, MTNAME, child.docId]);
    }

  }

  OnSelectMother(PTID: any) {
    this.router.navigate(['/Patient', PTID]);

  }

}
