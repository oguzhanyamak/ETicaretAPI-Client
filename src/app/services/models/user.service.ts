import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/Entities/user';
import { CreateUserResponse } from 'src/app/contracts/Users/create_user';
import { Observable, firstValueFrom } from 'rxjs';
import { LoginUser, LoginUserResponse } from 'src/app/contracts/Users/login_user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async signIn(user: User): Promise<CreateUserResponse> {
    const observable: Observable<CreateUserResponse | User> = this.httpClientService.post<CreateUserResponse | User>({ controller: "User" }, user);
    return await firstValueFrom(observable) as CreateUserResponse;
  }

  async login(loginData: LoginUser):Promise<LoginUserResponse> {
    const observable: Observable<LoginUserResponse | LoginUser> = this.httpClientService.post({ controller: "User", action: "Login" }, loginData);
    return await firstValueFrom(observable) as LoginUserResponse;
  }
}
