import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MaintainPatientsComponent } from './maintain-patients/maintain-patients.component';
import { PatientsComponent } from './patients/patients.component';
import { ChildComponent } from './child/child.component';
import { MaintainChildComponent } from './maintain-child/maintain-child.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'Patients', component: PatientsComponent},
  { path: 'Patient/:id', component: MaintainPatientsComponent},
  { path: 'Child',component: ChildComponent},
  { path: 'Child/:id', component: MaintainChildComponent},
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
