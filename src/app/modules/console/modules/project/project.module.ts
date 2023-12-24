import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { MainComponent } from './components/main/main.component';
import { ProjectApisComponent } from './components/project-apis/project-apis.component';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';
import { CreateProjectApiComponent } from './components/project-apis/components/create-project-api/create-project-api.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project/project.service';
import { WorkingProjectService } from '../../services/project/working-project.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ProjectApiService } from './services/project-api/project-api.service';
import { ViewProjectApiComponent } from './components/project-apis/components/view-project-api/view-project-api.component';
import { DeleteProjectApiComponent } from './components/project-apis/components/delete-project-api/delete-project-api.component';
import { ConfigChatbotApiComponent } from './components/project-apis/components/config-chatbot-api/config-chatbot-api.component';
import { ChatbotService } from './services/chatbot/chatbot.service';
import { ConfigEmformApiComponent } from './components/project-apis/components/config-emform-api/config-emform-api.component';


@NgModule({
  declarations: [
    MainComponent,
    ProjectApisComponent,
    ProjectDashboardComponent,
    ProjectSettingsComponent,
    CreateProjectApiComponent,
    ViewProjectApiComponent,
    DeleteProjectApiComponent,
    ConfigChatbotApiComponent,
    ConfigEmformApiComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ProjectService,
    WorkingProjectService,
    HttpService,
    ProjectApiService,
    ChatbotService
  ]
})
export class ProjectModule { }
