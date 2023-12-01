import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { ApiService, Product } from '../services/api.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent  implements OnInit{

  productForm!:FormGroup;
  modalLabel: string="add";
   data:any;
  productList:any = [];
  clicked=false;
  active:any
  
  constructor(private formBuilder:FormBuilder,
    private api:ApiService,private modelService:NgbModal, private toastr: ToastrService,private ngxService:NgxUiLoaderService,private router:Router){
     
    

  }

ngOnInit(): void {
//  this.loadForm(); not req 
 this.data=this.getAllProducts();
  
}

  
loadForm() {
  this.productForm=this.formBuilder.group({
    id:[''],
    name:['',Validators.required],
      details:['',Validators.required],
      price:['',Validators.required],
      discount:['',Validators.required]
  });
}


create(content: any) {
  this.loadForm()  //is it required
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

    // this.api.postProduct(requestBody)
    // {
    //   this.modelService.dismissAll();
    //   this.toastr.success("Product added successfully", '');
    //   this.clicked=false;
     
    //   this.getAllProducts();
    // } 
    // error:()=>{
    //     alert("Error while adding the product")
    //     this.clicked=false;
    //   }

     this.api.postProduct(requestBody)
      .subscribe({
        next: (res: any) => {
          this.modelService.dismissAll();
          this.toastr.success("Product added successfully", '');
          this.clicked = false;
          this.getAllProducts();
        },
        error: () => {
          alert("Error while adding the product");
          this.clicked = false;
        }
      });
    
  }

}

onLogout() {
  this.router.navigate(['/login']);
}

menulist(){
  this.router.navigate(['/menu-list'])
}

onUpdate(){
  this.productForm.markAllAsTouched();
  let requestBody  = {
    "name": this.productForm.get('name')?.value,
    "details": this.productForm.get('details')?.value,
    "price": this.productForm.get('price')?.value,
    "discount": this.productForm.get('discount')?.value,
    "id":this.productForm.get('id')?.value
  }
   
     this.productForm.markAllAsTouched();
     if(this.productForm.valid){
      this.api.updateProductByName(requestBody).subscribe({
        next: (res: any) => {
          this.modelService.dismissAll();
          this.toastr.success("Product updated successfully", '');
          this.clicked = false;
          this.getAllProducts();
        },
        // error: () => {
        //   alert("Error while updating the product");
        //   this.clicked = false;
        // }
      });
      // .pipe(
      //   tap(response=>{
      //     if(response.data){
      //       this.getAllProducts
      //       this.modelService.dismissAll();
      //       this.toastr.success("product updated successfully")

      //     }
          
      //   })
      // ).subscribe();
     
      }
     }

    
  
    

  

closeModel(){
  this.clicked=false;
  this.modelService.dismissAll();

}

getAllProducts(){
//    this.api.getProduct().subscribe((data: any)=>{
//     console.log(data);
//     this.productList=data;
//   });

this.api
      .getProduct()
      .pipe(
        tap(response => {
          if (response) {
           this.productList=response.data;
          }
          // this.cdr.markForCheck();
        }),
        // finalize(() => {
        //   this.cdr.markForCheck();
        // })
      )
      .subscribe();
}


edit(content:any,product:any){
  this.loadForm()
  this.modalLabel = "Edit";
  


 this.productForm.get("id")?.setValue(product?.id);
 this.productForm.get("name")?.setValue(product?.name);
 this.productForm.get("details")?.setValue(product?.details);
 this.productForm.get("price")?.setValue(product?.price);
 this.productForm.get("discount")?.setValue(product?.discount);
 
 this.modelService
 .open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: "modal-basic-title" })
 .result.then(
 );
}

deleteProduct(id:any){
  this.api
    .deleteProduct(id)
    .pipe(
      tap(response => {
        if (response) {
          if (response.status=="200 OK") {
            this.getAllProducts();
            this.toastr.success("Product deleted successfully", '');
            this.modelService.dismissAll();
            this.ngxService.stop();
          }
          
        }
        
      }),
      // finalize(() => {
      //   this.cdr.markForCheck();
      // })
    )
    .subscribe();
}

}