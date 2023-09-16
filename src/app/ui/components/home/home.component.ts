import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { delay } from 'rxjs';
import { User } from 'src/app/Entities/user';
import { CreateUserResponse } from 'src/app/contracts/Users/create_user';
import { LoginUser, LoginUserResponse } from 'src/app/contracts/Users/login_user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomToastrService, MessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { UserService } from 'src/app/services/models/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  signInForm: FormGroup;
  loginForm: FormGroup;
  tokenIsOk:boolean = false;
  constructor(private toastr: CustomToastrService, private formBuilder: FormBuilder, private userService: UserService,private jwtHelper:JwtHelperService,private router:Router,public authService:AuthService) {
    this.signInForm = formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      surname: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
    this.loginForm = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
    this.authService.identityCheck();
  }

  async signIn(data: User) {
  
    if (this.signInForm.valid) {
      const result: CreateUserResponse = await this.userService.signIn(data);
      if (result.succeeded === true) {
        this.toastr.message(result.message, "Başarılı", MessageType.Success, ToastrPosition.TopLeft)
      }
      else {
        this.toastr.message(result.message, "Başarısız", MessageType.Error, ToastrPosition.TopLeft)
      }
    } else {
      this.toastr.message("Lütfen İstenilen Bilgileri Düzgün Giriniz", "Hata", MessageType.Error, ToastrPosition.TopLeft);
    }

  }

  async login(data: LoginUser) {
    if (this.loginForm.valid) {
      const result: LoginUserResponse = await this.userService.login(data);
      if (result.succeded === true) {
        this.toastr.message(result.message, "Başarılı", MessageType.Success, ToastrPosition.TopLeft)
        localStorage.setItem("accessToken",result.token.accessToken);
        this.authService.identityCheck();
        this.reload();
      }
      else {
        this.toastr.message(result.message, "Başarısız", MessageType.Error, ToastrPosition.TopLeft)
      }
    }else{
      this.toastr.message("Lütfen İstenilen Bilgileri Düzgün Giriniz", "Hata", MessageType.Error, ToastrPosition.TopLeft);
    }
  }

  logOut(){
    localStorage.removeItem("accessToken");
    this.toastr.message("Çıkış Yaptiniz","",MessageType.Warning,ToastrPosition.TopRight);
    this.authService.identityCheck();
    this.reload();
  }

  async reload(){
    await this.sleep(1500)
    window.location.reload();
  }
  sleep(milliseconds: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

}

