import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtService:JwtHelperService) { }

  identityCheck(){
    const token: string = localStorage.getItem("accessToken") as string;
    _isAuthenticated = token != null && !this.jwtService.isTokenExpired(token);
  }

  get isAuthenticated():boolean{
    return _isAuthenticated;
  }
}

export let _isAuthenticated:boolean
