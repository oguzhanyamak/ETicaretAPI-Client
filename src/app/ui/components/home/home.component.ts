import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, MessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(toastr:CustomToastrService){
    toastr.message("Merhaba","Dünya",MessageType.Warning);
  }

}
