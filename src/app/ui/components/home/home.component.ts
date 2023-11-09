import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { Product } from 'src/app/contracts/list-product';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { DynamicComponentLoaderDirective } from 'src/app/directives/dynamic-component-loader.directive';
import { AuthService } from 'src/app/services/auth.service';
import { CustomToastrService, MessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { ComponentName, DynamicComponentLoaderService } from 'src/app/services/dynamic-component-loader.service';
import { BasketService } from 'src/app/services/models/basket.service';
import { OrderService } from 'src/app/services/models/order.service';
import { ProductService } from 'src/app/services/models/product.service';
import { UserService } from 'src/app/services/models/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild(DynamicComponentLoaderDirective, { static: true })
  dynamicComponentLoaderDirective!: DynamicComponentLoaderDirective;

  urunler: Product[] = [];
  basket: ListBasketItem[] = [];

  constructor(private toastr: CustomToastrService, private userService: UserService, public authService: AuthService, private socialAuthService: SocialAuthService, private productService: ProductService, private basketService: BasketService, private dynamicComponentLoaderService: DynamicComponentLoaderService, private orderService: OrderService) {
    this.authService.identityCheck();
    socialAuthService.authState.subscribe((user: SocialUser) => {
      userService.GoogleLogin(user);
      this.authService.identityCheck();
    });
    this.getProducts()
  }

  loadComponent() {
    this.dynamicComponentLoaderService.loadComponent(ComponentName.LoginComponent, this.dynamicComponentLoaderDirective?.viewContainerRef);
  }


  async getProducts() {
    this.urunler = await this.productService.read(() => { }, (hata) => { });
    console.log(this.urunler);
  }

  logOut() {
    localStorage.removeItem("accessToken");
    this.toastr.message("Çıkış Yaptiniz", "", MessageType.Warning, ToastrPosition.TopRight);
    this.authService.identityCheck();
    this.reload();
  }

  async reload() {
    window.location.reload();
  }


  async addToBasket(urun: Product): Promise<void> {
    let _basketItem: Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = urun.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
  }

  async getBasket() {
    this.basket = await this.basketService.get();
  }

  async shoppingComplete() {
    const newOrder = {} as Create_Order;
    newOrder.address = "123 Example Street";
    newOrder.description = "New order description";
    await this.orderService.create(newOrder);
  }


}

