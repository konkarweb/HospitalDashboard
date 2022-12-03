import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MaintainPatientsComponent } from './maintain-patients/maintain-patients.component';
import { PatientsComponent } from './patients/patients.component';
import { ChildComponent } from './child/child.component';
import { MaintainChildComponent } from './maintain-child/maintain-child.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  // { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'Patients', component: PatientsComponent, canActivate: [AuthGuard]},
  { path: 'Patient/:id', component: MaintainPatientsComponent, canActivate: [AuthGuard]},

  { path: 'Child',component: ChildComponent, canActivate: [AuthGuard]},
  { path: 'Childs/:PTid/:PTname', component: ChildComponent, canActivate: [AuthGuard]},

  { path: 'Child/:id', component: MaintainChildComponent, canActivate: [AuthGuard]},
  { path: 'Child/:MTid/:MTname/:id', component: MaintainChildComponent, canActivate: [AuthGuard]},

  { path: 'Vaccines/:id', component: VaccineComponent, canActivate: [AuthGuard]},
  { path: 'Medical/:id', component: MedicalHistoryComponent, canActivate: [AuthGuard]},

  {path: 'Users',component: UserComponent, canActivate : [AuthGuard]}
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
