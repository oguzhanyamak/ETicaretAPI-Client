import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create-product';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ListProduct } from 'src/app/contracts/list-product';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }


  create(product: CreateProduct|any, successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({ controller: "Product",action:"Upload"}, product).subscribe(
      {
        error: (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
          let message = "";
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          errorCallBack!(message);
        },
        complete: () => {
          successCallBack()
        },
        next: (data) => {

        }
      }
    );
  }

  async read(successCallBack: () => void,errorCallBack: (errorMessage: string) => void): Promise<ListProduct[]> {
    const promiseData = this.httpClientService.get<ListProduct[]>({ controller: "products" });
    try {
      const data = await firstValueFrom(promiseData);
      successCallBack();
      return data;
    } catch (errorResponse) {
      if(errorResponse instanceof HttpErrorResponse){
        errorCallBack(errorResponse.message);
      }
      else{
        errorCallBack("Beklenmedik bir sorun oluştu")
      }
      throw errorResponse;
    }
  }

  async delete(id:string){
    const deleteObs = this.httpClientService.delete({controller:"products"},id);
    return await firstValueFrom(deleteObs);
  }

}


