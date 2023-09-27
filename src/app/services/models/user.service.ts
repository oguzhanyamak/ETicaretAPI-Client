import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/Entities/user';
import { CreateUserResponse } from 'src/app/contracts/Users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginUser, LoginUserResponse } from 'src/app/contracts/Users/login_user';
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
    return await firstValueFrom(observable) as LoginUserResponse;
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
}
