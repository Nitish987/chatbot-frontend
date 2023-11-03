import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { HttpService } from 'src/app/services/http/http.service';


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    SignupComponent,
    RecoveryComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService, 
    AuthorizationService, 
    HttpService
  ]
})
export class AuthModule { }
