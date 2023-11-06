import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationService } from './services/auth/authorization.service';
import { HttpClientModule } from '@angular/common/http';
import { UserIdentityComponent } from './components/user-identity/user-identity.component';
import { HttpService } from './services/http/http.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    UserIdentityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthorizationService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
