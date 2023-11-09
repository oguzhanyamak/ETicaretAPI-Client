import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject("baseSignalRUrl") private baseSignalRUrl:string)  { }

  _connection!: HubConnection;
  get connection(): HubConnection {
    return this._connection;
  }

  start(hubUrl: string) {
    hubUrl = this.baseSignalRUrl+hubUrl;
    // return started hub
    if (!this.connection || this._connection?.state == HubConnectionState.Disconnected) {
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      const hubConnection: HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build();

      hubConnection.start().then(() => { console.log("Connected"); this._connection = hubConnection; }).catch(error => {
        setTimeout(() => {
          console.log("Başarısız");
          this.start(hubUrl);
        }, 2000);
      })
    }

    this._connection.onreconnected(connectiId => { console.log("reconnected") });
    this._connection.onreconnecting(error => { console.log("reconnecting...") });
    this._connection.onclose(error => { console.log("close reconnection") });

  }
  invoke(procedureName: string, message: string, successCallBack?: (value: any) => void, errorCallBack?: (error: any) => void) {
    //return send message client 2 client 
    this.connection.invoke(procedureName, message).then(successCallBack).catch(errorCallBack);
  }

  on(procedureName: string,callBack:(...message:any) => void) {
    // catch message
    this.connection.on(procedureName,callBack);
  }
}


export enum HubUrls{
  ProductHub = "products-hub",
  OrderHub = "orders-hub"
}

export enum ReceiveFunctions{
  OrderAddedMessageReceiveFunction = "receiveOrderAddedMessage"
}