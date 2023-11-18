import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetModule } from './password-reset/password-reset.module';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RegisterModule,
    LoginModule,
    PasswordResetModule
    //HomeModule
  ],
  exports:[RegisterModule,LoginModule,PasswordResetModule]
})
export class ComponentsModule { }
