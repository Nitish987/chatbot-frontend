import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authRoute, consoleRoute } from './settings/routes/routes';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: consoleRoute.main,
    pathMatch: 'full'
  },
  {
    path: authRoute.main,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: consoleRoute.main,
    loadChildren: () => import('./modules/console/console.module').then(m => m.ConsoleModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
