import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomToastrService, MessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  authService.identityCheck();
  if (authService.isAuthenticated) {
    return true
  } else {
    return false;
  }

};
