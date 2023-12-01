import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private localStorageKey='productkey'

  private product: Product[] = [];
  

  constructor(private http:HttpClient) { 
    
  }

getProduct():Observable<any>{
    // return this.http.get<Product[]>('http://localhost:8080/products');

    
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
     
    });
    return this.http.get<any>( 'http://localhost:8080/products', { headers: httpHeaders })
      .pipe(
        map((res: any) => {
          return res;
        }),
        // catchError(err => {
        //   return null;
        // }
        );
    
    
      }
    

postProduct(data:any):Observable<Product[]>{
  // return this.http.post<Product[]>('http://localhost:8080/products',data)
  
  
  const httpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
   
  });
  return this.http.post<any>( 'http://localhost:8080/products', data, { headers: httpHeaders })
    .pipe(
      map((res: any) => {
        return res;
      }),
      // catchError(err => {
      //   return null;
      // })
    );



}

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
     const httpHeaders=new HttpHeaders({
      "Content-Type":"application/json",

     });
     return this.http.put<any>('http://localhost:8080/products',request,{headers:httpHeaders})
     .pipe(
      map((res:any)=>{
        return res;
      }),
     )
  
}
}

deleteProduct(id: any):Observable<any>{
  const httpHeaders=new HttpHeaders({
    "Content-Type":"application/json",
  });
  return this.http.delete<any>('http://localhost:8080/products/'+id,{headers:httpHeaders})
  .pipe(
    map((res:any)=>{
       return res;
    }),
  )
}

}

export interface Product {
  name:string;
  details:string;
  price:number;
  discount:number
}
