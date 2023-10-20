import { Component } from '@angular/core';
import { Product } from 'src/app/contracts/list-product';
import { ProductService } from 'src/app/services/models/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  prodName:string = "";
  urunler: Product[] = [];
  urun:Product|undefined;
  constructor(private productService: ProductService) {
    this.getProducts();
  }

  async getProducts() {
    this.urunler = await this.productService.read(() => { }, (hata) => { });
    console.log(this.urunler);
  }
  setUrun(index:number){
    this.urun = this.urunler[index];
  }

  async searchByName(){
    this.urunler = await this.productService.getByName(this.prodName);
  }
}
