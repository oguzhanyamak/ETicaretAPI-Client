import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUser, LoginUserResponse } from 'src/app/contracts/Users/login_user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomToastrService, MessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { UserService } from 'src/app/services/models/user.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: CustomToastrService, private router: Router, private activatedRoute: ActivatedRoute, public authService: AuthService) {
    this.loginForm = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  async login(data: LoginUser) {
    if (this.loginForm.valid) {
      const result: LoginUserResponse = await this.userService.login(data, () => { });
      if (result.succeded === true) {
        this.toastr.message(result.message, "Başarılı", MessageType.Success, ToastrPosition.TopLeft)
        this.authService.identityCheck();
        this.reload();
        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl = params["returnUrl"];
          if (returnUrl) {
            this.router.navigate([returnUrl]);
          }
        })
      }
      else {
        this.toastr.message(result.message, "Başarısız", MessageType.Error, ToastrPosition.TopLeft)
      }
    } else {
      this.toastr.message("Lütfen İstenilen Bilgileri Düzgün Giriniz", "Hata", MessageType.Error, ToastrPosition.TopLeft);
    }
  }

  async reload(){
    window.location.reload();
  }

}
