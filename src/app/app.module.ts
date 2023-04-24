import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsComponent } from './patients/patients.component';
import { HomeComponent } from './home/home.component';
import { MaintainPatientsComponent } from './maintain-patients/maintain-patients.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChildComponent } from './child/child.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { MaintainChildComponent } from './maintain-child/maintain-child.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthServiceService } from './auth-service.service';
import { UserComponent } from './user/user.component';
import { MaintainUserComponent } from './maintain-user/maintain-user.component';
import { VaccineDetailsComponent } from './vaccine-details/vaccine-details.component';
import { VaccineDetailsTableComponent } from './vaccine-details-table/vaccine-details-table.component';
import { ApploadingComponent } from './apploading/apploading.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    HomeComponent,
    MaintainPatientsComponent,
    ChildComponent,
    MaintainChildComponent,
    VaccineComponent,
    MedicalHistoryComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UserComponent,
    MaintainUserComponent,
    VaccineDetailsComponent,
    VaccineDetailsTableComponent,
    ApploadingComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    AuthServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
