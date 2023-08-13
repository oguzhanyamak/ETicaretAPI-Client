import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create-product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }


  create(product: CreateProduct, successCallBack?: any, errorCallBack?:any) {
    this.httpClientService.post({ controller: "products", }, product).subscribe(
      {
        error: (errorResponse:HttpErrorResponse) => {
          const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
          let message = "";
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          errorCallBack(message);
        },
        complete : () => {
          successCallBack()
        },
        next: (data) => {

        }
      }
    );
  }
}