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

  fileData: FormData = new FormData();
  url: any;
  frm: FormGroup;
  constructor(private productService: ProductService, private toasterService: CustomToastrService, private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$")]],
      stock: [, [Validators.min(0), Validators.required]],
      price: [, [Validators.min(0), Validators.required,]],
    });
    this.frm.valueChanges.subscribe({
      next: data => { console.log(data) }
    });
    this.frm.statusChanges.subscribe({
      next: data => { console.log("status : " + data) }
    });
    this.frm.get("image")?.valueChanges.subscribe({
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
      this.productService.create(createProduct, () => { this.toasterService.message("Ekleme İşlemi Başarıyla Yapılmıştır", "Başarılı", MessageType.Success, ToastrPosition.TopRight), this.clearForm(this.frm) }, (errorMessage: string) => { this.toasterService.message(errorMessage, "Hata", MessageType.Error, ToastrPosition.BottomFullWidth) });
      this.productService.uploadImage(this.fileData);
    }
    else {
      this.toasterService.message("Lütfen Formu Uygun Şekilde Doldurunuz", "Başarisiz", MessageType.Error, ToastrPosition.TopRight)
    }
  }

  clearForm(makeClear: FormGroup) {
    makeClear.reset();
  }

  imageUpload(event: any) {
    const file = event.currentTarget.files[0];
    if (file.type == "image/png") {
      this.fileData.append('file', file);
    }
  }
}



//this.frm.controls["name"].setValue("Ankara,{onlySelf:true});
//onlyself yapılan değişikliğin programatik olması durumunda formun validasyon sürecine dahil edilmemesini gerektiğini belirtir