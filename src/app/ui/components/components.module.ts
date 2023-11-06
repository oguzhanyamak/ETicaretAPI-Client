import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RegisterModule,
    LoginModule
    //HomeModule
  ],
  exports:[RegisterModule,LoginModule]
})
export class ComponentsModule { }
