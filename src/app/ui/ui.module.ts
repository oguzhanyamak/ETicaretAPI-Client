import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { RegisterModule } from './components/register/register.module';
import { LoginModule } from './components/login/login.module';
import { PasswordResetModule } from './components/password-reset/password-reset.module';



@NgModule({
  declarations: [],
  imports: [
    ComponentsModule
  ],
  exports:[RegisterModule,LoginModule,PasswordResetModule]
})
export class UIModule { }
