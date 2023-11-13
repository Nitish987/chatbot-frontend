import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { MainComponent } from './components/main/main.component';
import { ProjectApisComponent } from './components/project-apis/project-apis.component';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';


@NgModule({
  declarations: [
    MainComponent,
    ProjectApisComponent,
    ProjectDashboardComponent,
    ProjectSettingsComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule
  ]
})
export class ProjectModule { }
