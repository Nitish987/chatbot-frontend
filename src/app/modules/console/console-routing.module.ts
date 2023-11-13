import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { consoleRoute } from 'src/app/settings/routes/routes';
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
        path: consoleRoute.childRoute.project.main,
        loadChildren: () => import('./modules/project/project.module').then(m => m.ProjectModule)
      },
      {
        path: consoleRoute.childRoute.billing,
        loadChildren: () => import('./modules/billing/billing.module').then(m => m.BillingModule)
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
