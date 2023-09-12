import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  active = ["active{color:red;}"]

  sidebarOpen:boolean = false;

  changeSidebarStatus(){
    this.sidebarOpen = !this.sidebarOpen;
    console.log(this.sidebarOpen);
  }
}
