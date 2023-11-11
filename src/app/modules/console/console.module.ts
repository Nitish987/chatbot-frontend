import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleRoutingModule } from './console-routing.module';
import { MainComponent } from './components/main/main.component';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { NavbarComponent } from './components/main/components/navbar/navbar.component';
import { SidebarComponent } from './components/main/components/sidebar/sidebar.component';
import { ProjectComponent } from './components/project/project.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BillingComponent } from './components/billing/billing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfilePicChangeComponent } from './components/settings/components/profile-pic-change/profile-pic-change.component';
import { EmailChangeComponent } from './components/settings/components/email-change/email-change.component';
import { UserIdentityService } from 'src/app/services/user-identity/user-identity.service';
import { SettingsService } from './services/settings/settings.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/auth/user.service';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { ProjectService } from './services/project/project.service';


@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    ProjectComponent,
    SettingsComponent,
    BillingComponent,
    DashboardComponent,
    ProfilePicChangeComponent,
    EmailChangeComponent,
    CreateProjectComponent
  ],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthorizationService, 
    UserIdentityService,
    SettingsService,
    UserService,
    ProjectService
  ]
})
export class ConsoleModule { }
