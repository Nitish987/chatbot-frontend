import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { consoleRoute } from 'src/app/settings/routes/routes';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { ProjectApisComponent } from './components/project-apis/project-apis.component';
import { ProjectSettingsComponent } from './components/project-settings/project-settings.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: consoleRoute.childRoute.project.childRoute.dashboard,
        component: ProjectDashboardComponent
      },
      {
        path: consoleRoute.childRoute.project.childRoute.apis,
        component: ProjectApisComponent
      },
      {
        path: consoleRoute.childRoute.project.childRoute.settings,
        component: ProjectSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
