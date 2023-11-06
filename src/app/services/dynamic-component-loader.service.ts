import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentLoaderService {

  constructor() {}
  async loadComponent(component:ComponentName,viewContainerRef:ViewContainerRef) {
    let _component:any = null;
      switch(component){
        case ComponentName.LoginComponent:
          _component = (await import("../ui/components/login/login.component")).LoginComponent; //component path
        break;
      }
      viewContainerRef.clear();
      return viewContainerRef.createComponent(_component);
  }
}

export enum ComponentName{
  LoginComponent
}

/*
direktif ile işaretlenen viewcontainerref üzerinden ilgili alana dinamik olarak component bastırmaya yarar


*/