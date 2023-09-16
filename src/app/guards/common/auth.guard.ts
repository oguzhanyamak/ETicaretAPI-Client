import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomToastrService, MessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(CustomToastrService);
  authService.identityCheck();
  if (authService.isAuthenticated) {
    return true
  } 
  else {
    router.navigate([""],{queryParams:{returnUrl:state.url}})
    toastr.message("Bu Sayfaya Erişmek İçin Giriş Yapmanız Gerekmektedir.","Uyarı",MessageType.Info,ToastrPosition.TopRight);
    return false;
  }

};
