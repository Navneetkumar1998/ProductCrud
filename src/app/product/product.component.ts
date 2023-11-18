import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ApiService, Product } from '../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  implements OnInit{

  productForm!:FormGroup;
  modalLabel: string="add";
   data:any;
  productList: Product[] = [];
  clicked=false;
  
  constructor(private formBuilder:FormBuilder,
    private api:ApiService,private modelService:NgbModal, private toastr: ToastrService,private ngxService:NgxUiLoaderService,private router:Router){

  }

ngOnInit(): void {
 this.loadForm();
 this.data=this.getAllProducts();
  
}

  
loadForm() {
  this.productForm=this.formBuilder.group({
    name:['',Validators.required],
      details:['',Validators.required],
      price:['',Validators.required],
      discount:['',Validators.required]
  });
}


create(content: any) {
  this.loadForm()
  this.clicked=true;
  this.modalLabel = "Add";
  this.modelService
    .open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: "modal-basic-title" })
    .result.then(
    );
}


onSubmit(){
  if(this.productForm.valid){
    let requestBody  = {
      "name": this.productForm.get('name')?.value,
      "details": this.productForm.get('details')?.value,
      "price": this.productForm.get('price')?.value,
      "discount": this.productForm.get('discount')?.value
    }

    this.api.postProduct(requestBody)
    {
      this.modelService.dismissAll();
      this.toastr.success("Product added successfully", '');
      this.clicked=false;
     
      this.getAllProducts();
    } 
    error:()=>{
        alert("Error while adding the product")
        this.clicked=false;
      }
    
  }

}

onLogout() {
  this.router.navigate(['/login']);
}

onUpdate(){
  this.productForm.markAllAsTouched();
  let requestBody  = {
    "name": this.productForm.get('name')?.value,
    "details": this.productForm.get('details')?.value,
    "price": this.productForm.get('price')?.value,
    "discount": this.productForm.get('discount')?.value
  }
   
     this.api.updateProductByName(requestBody);
     this.modelService.dismissAll();
     this.toastr.success("Product updated successfully", '');
     this.getAllProducts();

  }

closeModel(){
  this.clicked=false;
  this.modelService.dismissAll();

}
getAllProducts(){
  this.productList = this.api.getProduct();

}

edit(content:any,product:any){
  this.loadForm()
  this.modalLabel = "Edit";
  this.modelService
    .open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: "modal-basic-title" })
    .result.then(
    );

  let name=product.name;
 let product1= this.api.getProductByName(name);

 this.productForm.get("name")?.setValue(product1?.name);
 this.productForm.get("details")?.setValue(product1?.details)
 this.productForm.get("price")?.setValue(product1?.price);
 this.productForm.get("discount")?.setValue(product1?.discount);

}

deleteProduct(product:any){
  this.api.deleteProduct(product.name);
  this.getAllProducts();

}

}
