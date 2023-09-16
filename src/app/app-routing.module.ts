import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { authGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {path:"admin",component:LayoutComponent,children:[
    {path:"",component:DashboardComponent},
    {path:"customers",loadChildren:()=>import("./admin/components/customers/customers.module").then(module => module.CustomersModule)},
    {path:"products",loadChildren:()=>import("./admin/components/products/products.module").then(module => module.ProductsModule),},
    {path:"orders",loadChildren:()=>import("./admin/components/orders/orders.module").then(module => module.OrdersModule)},
  ],canActivate:[authGuard]},
  {path:"",component:HomeComponent},
  {path:"register",loadChildren:()=>import("./ui/components/register/register.module").then(module => module.RegisterModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
