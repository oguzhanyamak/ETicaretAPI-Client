import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    RegisterModule,
    ReactiveFormsModule,
  ],
  exports:[HomeComponent]
})
export class ComponentsModule { }
