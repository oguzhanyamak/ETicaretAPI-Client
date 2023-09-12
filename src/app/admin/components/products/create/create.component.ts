import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProduct } from 'src/app/contracts/create-product';
import { CustomToastrService, MessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';
import { ProductService } from 'src/app/services/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  fileData:FormData = new FormData();
  url:any;
  frm: FormGroup;
  constructor(private productService: ProductService, private toasterService: CustomToastrService, private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$")]],
      stock: [, [Validators.min(0), Validators.required]],
      price: [, [Validators.min(0), Validators.required,]],
      image:[]
    });
    this.frm.valueChanges.subscribe({
      next: data => { console.log(data) }
    });
    this.frm.statusChanges.subscribe({
      next: data => { console.log("status : " + data) }
    });
    this.frm.get("name")?.valueChanges.subscribe({
      next: data => { console.log(data + "---") }
    })
  };

  get name() {
    return this.frm.get("name");
  }
  get price() {
    return this.frm.get("price");
  }
  get stock() {
    return this.frm.get("stock");
  }


  create(data: { name: string, stock: number, price: number }) {
    //console.log(data);
    const createProduct: CreateProduct = { name: data.name, price: data.price, stock: data.stock }
    if (this.frm.valid) {
      debugger;
      this.productService.create(this.fileData, () => { this.toasterService.message("Ekleme İşlemi Başarıyla Yapılmıştır", "Başarılı", MessageType.Success, ToastrPosition.TopRight)},(errorMessage:string)=>{this.toasterService.message(errorMessage,"Hata",MessageType.Error,ToastrPosition.BottomFullWidth)});
      
    }
    else {
      this.toasterService.message("Lütfen Formu Uygun Şekilde Doldurunuz", "Başarisiz", MessageType.Error, ToastrPosition.TopRight)
    }

  }

  imageUpload(event:any){
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event:any)=>{
      this.url = event.target.result;
    }
    const file = event.target.files[0];
    this.fileData.append('file',file);
  }

}


//this.frm.controls["name"].setValue("Ankara,{onlySelf:true});
//onlyself yapılan değişikliğin programatik olması durumunda formun validasyon sürecine dahil edilmemesini gerektiğini belirtir