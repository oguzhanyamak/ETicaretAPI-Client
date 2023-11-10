import { Component } from '@angular/core';
import { MessageType } from '@microsoft/signalr';
import { CustomToastrService, MessageType as MSGT, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { HubUrls, ReceiveFunctions, SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private signalRService:SignalRService,private toastrService:CustomToastrService) {

  }

  ngOnInit():void {
    this.signalRService.on(HubUrls.OrderHub,ReceiveFunctions.OrderAddedMessageReceiveFunction,message => {
      this.toastrService.message(message,"Order",MSGT.Success,ToastrPosition.TopRight)
    });
    this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction,message => {
      this.toastrService.message(message,"Product",MSGT.Success,ToastrPosition.TopRight)
    })
  }
}
