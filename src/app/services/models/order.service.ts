import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly httpClientService:HttpClientService) { }


  async create(order:Create_Order){
    const observable:Observable<any> = this.httpClientService.post({controller:"Orders"},order);
    await firstValueFrom(observable)
  }
}
