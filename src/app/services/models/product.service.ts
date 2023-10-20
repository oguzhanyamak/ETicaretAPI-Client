import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from 'src/app/contracts/create-product';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from 'src/app/contracts/list-product';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }


  create(product: CreateProduct|any, successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post<boolean>({ controller: "Product"}, product).subscribe(
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
        next: (data) => {
          successCallBack();
        }
      }
    );
  }

  async read(successCallBack: () => void,errorCallBack: (errorMessage: string) => void): Promise<Product[]> {
    const promiseData = this.httpClientService.get<Product[]>({ controller: "Product"});
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

  async uploadImage(data:any){
    const resultData = this.httpClientService.put({controller:"Product",action:"Upload"},data);
    return await firstValueFrom(resultData);
  }

  async getByName(prodName:string):Promise<Product[]>{
    const datas = this.httpClientService.get({controller:"Product",action:"GetByName"},prodName);
    return await firstValueFrom(datas) as Product[];
  }

}


