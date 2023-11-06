import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule,
    FormsModule, 
  ],
  exports:[
    LoginComponent,
  ]
})
export class LoginModule { }
