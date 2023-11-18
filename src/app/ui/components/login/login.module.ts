import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule,
    FormsModule, 
    RouterModule
  ],
  exports:[
    LoginComponent,
  ]
})
export class LoginModule { }
