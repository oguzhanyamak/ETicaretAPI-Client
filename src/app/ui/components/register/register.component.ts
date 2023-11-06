import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Entities/user';
import { CreateUserResponse } from 'src/app/contracts/Users/create_user';
import { CustomToastrService, MessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { UserService } from 'src/app/services/models/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signInForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private userService: UserService,private toastr: CustomToastrService) {
    this.signInForm = formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      surname: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
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


}
