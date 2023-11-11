import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { consoleRoute } from 'src/app/settings/routes/routes';
import { ProjectComponent } from './components/project/project.component';
import { BillingComponent } from './components/billing/billing.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: consoleRoute.childRoute.dashboard,
        component: DashboardComponent
      },
      {
        path: consoleRoute.childRoute.createProject,
        component: CreateProjectComponent
      },
      {
        path: consoleRoute.childRoute.project,
        component: ProjectComponent
      },
      {
        path: consoleRoute.childRoute.billing,
        component: BillingComponent
      },
      {
        path: consoleRoute.childRoute.settings,
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
