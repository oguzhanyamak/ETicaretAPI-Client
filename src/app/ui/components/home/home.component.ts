import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { ListBasketItem } from 'src/app/contracts/basket/list-basket-item';
import { Product } from 'src/app/contracts/list-product';
import { AuthService } from 'src/app/services/auth.service';
import { CustomToastrService, MessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { BasketService } from 'src/app/services/models/basket.service';
import { ProductService } from 'src/app/services/models/product.service';
import { UserService } from 'src/app/services/models/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  urunler: Product[] = [];
  basket:ListBasketItem[] = [];

  constructor(private toastr: CustomToastrService, private formBuilder: FormBuilder, private userService: UserService,private jwtHelper:JwtHelperService,private router:Router,public authService:AuthService,private activatedRoute:ActivatedRoute,private socialAuthService:SocialAuthService,private productService:ProductService,private basketService:BasketService) {
    this.authService.identityCheck();
    socialAuthService.authState.subscribe((user:SocialUser)=>{
      userService.GoogleLogin(user);
      this.authService.identityCheck();
    });
    this.getProducts()
  }



  async getProducts() {
    this.urunler = await this.productService.read(() => { }, (hata) => { });
    console.log(this.urunler);
    this.getBasket();
  }

  logOut(){
    localStorage.removeItem("accessToken");
    this.toastr.message("Çıkış Yaptiniz","",MessageType.Warning,ToastrPosition.TopRight);
    this.authService.identityCheck();
    this.reload();
  }

  async reload(){
    window.location.reload();
  }


  async addToBasket(urun:Product):Promise<void>{
    let _basketItem:Create_Basket_Item = new Create_Basket_Item();
    _basketItem.productId = urun.id;
    _basketItem.quantity = 1;
    await this.basketService.add(_basketItem);
  }

  async getBasket(){
    this.basket = await this.basketService.get();
    debugger;
  }


}

