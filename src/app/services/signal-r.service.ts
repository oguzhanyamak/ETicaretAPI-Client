import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl:string)  { }

  start(hubUrl: string) {
    hubUrl = this.baseSignalRUrl+hubUrl;
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      const hubConnection: HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build();

      hubConnection.start().then(() => { console.log("Connected"); }).catch(error => {
        setTimeout(() => {
          console.log("Başarısız");
          this.start(hubUrl);
        }, 2000);
      })
    
    hubConnection.onreconnected(connectiId => { console.log("reconnected") });
    hubConnection.onreconnecting(error => { console.log("reconnecting...") });
    hubConnection.onclose(error => { console.log("close reconnection") });
    return hubConnection;
  }

  invoke(hubUrl:string,procedureName: string, message: string, successCallBack?: (value: any) => void, errorCallBack?: (error: any) => void) {
    //return send message client 2 client 
    this.start(hubUrl).invoke(procedureName, message).then(successCallBack).catch(errorCallBack);
  }

  on(hubUrl:string,procedureName: string,callBack:(...message:any) => void) {
    // catch message
    this.start(hubUrl).on(procedureName,callBack);
  }
}


export enum HubUrls{
  ProductHub = "products-hub",
  OrderHub = "orders-hub"
}

export enum ReceiveFunctions{
  OrderAddedMessageReceiveFunction = "receiveOrderAddedMessage",
  ProductAddedMessageReceiveFunction="receiveProductAddedMessage",
}