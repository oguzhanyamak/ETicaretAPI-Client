import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/Entities/user';
import { CreateUserResponse } from 'src/app/contracts/Users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginUser, LoginUserResponse, refreshTokenLogin } from 'src/app/contracts/Users/login_user';
import { Router } from '@angular/router';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClientService: HttpClientService,private router:Router) { }

  async signIn(user: User): Promise<CreateUserResponse> {
    const observable: Observable<CreateUserResponse | User> = this.httpClientService.post<CreateUserResponse | User>({ controller: "User" }, user);
    return await firstValueFrom(observable) as CreateUserResponse;
  }

  async login(loginData: LoginUser, callBackFunction: () => void):Promise<LoginUserResponse> {
    const observable: Observable<LoginUserResponse | LoginUser> = this.httpClientService.post({ controller: "Auth", action: "Login" }, loginData);
    callBackFunction();
    const data:LoginUserResponse = await firstValueFrom(observable) as LoginUserResponse;
    localStorage.setItem("accessToken",data.token.accessToken);
    localStorage.setItem("refreshToken",data.token.refToken!);
    return data;
  }

  async refTokenLogin(loginData: refreshTokenLogin, callBackFunction: () => void):Promise<LoginUserResponse> {
    const observable: Observable<LoginUserResponse | refreshTokenLogin> = this.httpClientService.post({ controller: "Auth", action: "RefreshTokenLogin" }, loginData);
    callBackFunction();
    const data:LoginUserResponse = await firstValueFrom(observable) as LoginUserResponse;
    localStorage.setItem("accessToken",data.token.accessToken);
    localStorage.setItem("refreshToken",data.token.refToken!);
    return data;
  }

  async GoogleLogin(loginData:SocialUser):Promise<any>{
    const observable:Observable<LoginUserResponse | SocialUser> = this.httpClientService.post({controller:"Auth",action:"GoogleLogin"},loginData)
    const response:LoginUserResponse = await firstValueFrom(observable) as LoginUserResponse;
    if(response.succeded){
      localStorage.setItem("accessToken",response.token.accessToken);
    }
    else{

    }
  }

  async passwordReset(email:string,callBackFunction?: ()=> void){
    const observable:Observable<any> = this.httpClientService.post({controller:"auth",action:"password-reset"},{email:email});
    await firstValueFrom(observable);
    callBackFunction
  }

  async verifyResetToken(resetToken:string,userId:string){
    const observable:Observable<any> = this.httpClientService.post({controller:"auth",action:"verify-reset-token"},{resetToken:resetToken,userId:userId});
    await firstValueFrom(observable);
  }
}
