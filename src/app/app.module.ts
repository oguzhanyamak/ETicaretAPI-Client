import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UIModule } from './ui/ui.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UIModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({ config: { tokenGetter: () => localStorage.getItem("accessToken"), allowedDomains: ["localhost:7126"] } })
  ],
  providers: [{ provide: "baseUrl", useValue: "https://localhost:7126/api", multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
