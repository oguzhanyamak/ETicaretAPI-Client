import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ProductsComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:"",component:ProductsComponent},
      {path:"add",component:CreateComponent}
    ])
  ]
})
export class ProductsModule { }
