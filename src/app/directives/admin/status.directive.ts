import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { CustomToastrService, MessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import { ProductService } from 'src/app/services/models/product.service';

@Directive({
  selector: '[appStatus]'
})
export class StatusDirective {
  @Input() id: string = "";
  @Input() controller: string = "";
  @Input() status: boolean = true;

  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService:HttpClientService,private toastrService:CustomToastrService) {
    const btn = this._renderer.createElement("button");
    btn.textContent = "Yayından Kaldır";
    btn.setAttribute("class", "btn btn btn-danger");
    _renderer.appendChild(element.nativeElement, btn);

  }

  @HostListener("click")
  async onclick() {
    this.httpClientService.delete({controller:this.controller},this.id).subscribe({
      complete:()=>{
        this.toastrService.message("Ürün yayından kaldırılmıştır","Başarılı",MessageType.Success,ToastrPosition.TopLeft);
      },
      error:()=>{
        this.toastrService.message("Beklenmedik bir hata oluştu","Başarısız",MessageType.Error,ToastrPosition.TopLeft);
      }
    });
  }

}
