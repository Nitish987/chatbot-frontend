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
        path: authRoute.childRoute.login,
        component: LoginComponent
      },
      {
        path: authRoute.childRoute.signup,
        component: SignupComponent
      },
      {
        path: authRoute.childRoute.recovery,
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
