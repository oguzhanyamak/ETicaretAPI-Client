import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, MessageType, ToastrPosition } from './custom-toastr.service';
import { UserService } from './models/user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastr:CustomToastrService,private userService:UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(catchError(error => {
      switch(error.status){
        case HttpStatusCode.Unauthorized:
          this.toastr.message("Yetkisiz İşlem","Bu işlemi yapmaya yetkiniz bulunmamaktadır!",MessageType.Error,ToastrPosition.TopRight);
          this.userService.refTokenLogin({refToken : localStorage.getItem("refreshToken")},()=>{}).then();
          break;
        case HttpStatusCode.InternalServerError:
          this.toastr.message("Sunucuya Erişilemiyor","Şuanda sunucya erişlemiyor lütfen daha sonra tekrar deneyiniz.",MessageType.Error,ToastrPosition.TopRight);
          break;
        case HttpStatusCode.NotFound:
          this.toastr.message("Bulunamadı","Aradığınız sayfa bulunamadı!",MessageType.Error,ToastrPosition.TopRight);
          break;
        default:
          this.toastr.message("Hata","Bilinmeyen Bir Hata Oluştu",MessageType.Warning,ToastrPosition.TopRight);
          break;
      }
      return of(error);
    }));
  }
}
