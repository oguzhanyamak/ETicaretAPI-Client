import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr:ToastrService) { }

  message(message:string,title:string,messageType:MessageType,position:ToastrPosition = ToastrPosition.TopRight){
    this.toastr[messageType](message,title,{positionClass:position});
  }

}

export enum MessageType{
  Success = "success",
  Info = "info",
  Error = "error",
  Warning = "warning"
}

export enum ToastrPosition{
TopRight = "toast-top-right",
BottomRight = "toast-bottom-right",
BottomLeft = "toast-bottom-left",
TopLeft ="toast-top-left",
TopFullWidth = "toast-full-width",
BottomFullWidth = "toast-bottom-full-width",
TopCenter = "toast-top-center",
BottomCenter = "toast-bottom-center",
}