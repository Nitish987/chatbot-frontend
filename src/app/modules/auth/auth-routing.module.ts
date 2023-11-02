import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authRoute } from 'src/app/settings/routes/routes';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RecoveryComponent } from './components/recovery/recovery.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: authRoute.login,
        component: LoginComponent
      },
      {
        path: authRoute.signup,
        component: SignupComponent
      },
      {
        path: authRoute.recovery,
        component: RecoveryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
