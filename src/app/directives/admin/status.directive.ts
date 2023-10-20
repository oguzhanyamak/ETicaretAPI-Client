import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { Product } from 'src/app/contracts/list-product';
import { CustomToastrService, MessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import { ProductService } from 'src/app/services/models/product.service';

@Directive({
  selector: '[appStatus]'
})
export class StatusDirective {
  @Input() product:Product|undefined;
  @Input() controller: string = "Product";
  @Output() refreshPage:EventEmitter<any>;


  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService:HttpClientService,private toastrService:CustomToastrService) {
    this.refreshPage = new EventEmitter();
  }

  @HostListener("click")
  async onclick() {
    if(this.product != null){
      console.log(this.product?.isActive);
      this.product.isActive = !this.product.isActive;
      this.httpClientService.put({controller:this.controller},this.product!).subscribe({
        complete:()=>{
          this.toastrService.message("Ürün yayından kaldırılmıştır","Başarılı",MessageType.Success,ToastrPosition.TopLeft);
          this.refreshPage?.emit();
        },
        error:()=>{
          this.toastrService.message("Beklenmedik bir hata oluştu","Başarısız",MessageType.Error,ToastrPosition.TopLeft);
        }
      });
    }
    else{
      this.toastrService.message("Beklenmedik bir hata oluştu","Başarısız",MessageType.Error,ToastrPosition.TopLeft);
    }

  }

}
