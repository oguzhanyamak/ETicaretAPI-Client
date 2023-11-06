import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Observable, firstValueFrom } from 'rxjs';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService) { }

  async get() : Promise<ListBasketItem[]> {
    const observable : Observable<ListBasketItem[]> = this.httpClientService.get({controller:"Basket"});
    return await firstValueFrom(observable);
  }

  async add(basketItem:Create_Basket_Item):Promise<void>{
    const observable:Observable<any> = this.httpClientService.post({controller:"Basket"},basketItem);
    await firstValueFrom(observable);
  }

  async put(product:Update_Basket_Item):Promise<void>{
    const observable:Observable<any> = this.httpClientService.put({controller:"Basket"},product);
    await firstValueFrom(observable);
  }

  async delete(basketItemId:string):Promise<void>{
    const observable:Observable<any> = this.httpClientService.delete({controller:"Basket"},basketItemId);
    await firstValueFrom(observable);
  }

}
