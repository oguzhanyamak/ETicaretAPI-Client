import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Entities/user';
import { CreateUserResponse } from 'src/app/contracts/Users/create_user';
import { LoginUser, LoginUserResponse } from 'src/app/contracts/Users/login_user';
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
  constructor(private toastr: CustomToastrService, private formBuilder: FormBuilder, private userService: UserService) {
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
        console.log(result);
        localStorage.setItem("accessToken",result.token.accessToken);
      }
      else {
        this.toastr.message(result.message, "Başarısız", MessageType.Error, ToastrPosition.TopLeft)
      }
    }else{
      this.toastr.message("Lütfen İstenilen Bilgileri Düzgün Giriniz", "Hata", MessageType.Error, ToastrPosition.TopLeft);
    }
  }

}
