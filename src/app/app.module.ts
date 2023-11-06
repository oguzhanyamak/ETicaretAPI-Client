import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UIModule } from './ui/ui.module';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HomeComponent } from './ui/components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorHandlerInterceptorService } from './services/http-error-handler-interceptor.service';
import { DynamicComponentLoaderDirective } from './directives/dynamic-component-loader.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DynamicComponentLoaderDirective
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UIModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({ config: { tokenGetter: () => localStorage.getItem("accessToken"), allowedDomains: ["localhost:7126"] ,headerName:"Authorization"} }),
    
  ],
  providers: [{ provide: "baseUrl", useValue: "https://localhost:7126/api", multi: true },{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '243490592105-np1s5vppcjlchilclnauugtqmsn1htte.apps.googleusercontent.com'
          )
        },
      ],
      onError: (err:any) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig
  },
  {provide : HTTP_INTERCEPTORS, useClass:HttpErrorHandlerInterceptorService,multi:true}  
],
  bootstrap: [AppComponent]
})
export class AppModule { }
