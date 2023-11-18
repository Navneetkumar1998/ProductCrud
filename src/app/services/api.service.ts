import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private localStorageKey='productkey'

  private product: Product[] = [];


  constructor() { 
    
  }

  
getProduct():any{
    let data =  localStorage.getItem(this.localStorageKey);
    this.product = data ? JSON.parse(data) : null;
    return this.product;
}

postProduct(data:any){
  this.product.push(data);
  localStorage.setItem(this.localStorageKey,JSON.stringify(this.product));
  
  return this.product;




}
// public addJobs(data: any): Observable<any> {
    
//   return this.userService.isLoggedin().pipe(
//     mergeMap((resp: any) => {
//       if (resp.status === '200 OK' && resp.data) {
//         const opt = {
//           headers: { Authorization: `Bearer ${resp.token}` },
//         };
//         return this.http.post<any>(
//           `/api/v1/sp/job`,
//           data,
//           opt,
//         );
//       } else {
//         console.log('Failed');
//         this.globalService.logOutUser();

getProductByName(name:any){
  for(let i=0;i<this.product.length;i++){
    if(name== this.product[i].name){
      return this.product[i];
    }
  }
  return null;
}

updateProductByName(request:any){
  {
      this.product = this.product.map(item => (item.name === request.name ? request : item));
      localStorage.setItem('productkey',JSON.stringify(this.product))
  
}
}

deleteProduct(pname:any){
  for(let i=0;i<this.product.length;i++){
    if(pname== this.product[i].name){
      this.product.splice(i,1);
      localStorage.setItem('productkey',JSON.stringify(this.product))
    }
  }

}

}

export interface Product {
  name:string;
  details:string;
  price:number;
  discount:number
}
