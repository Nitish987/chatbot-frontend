import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleRoutingModule } from './console-routing.module';
import { MainComponent } from './components/main/main.component';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ConsoleRoutingModule
  ],
  providers: [AuthorizationService]
})
export class ConsoleModule { }
