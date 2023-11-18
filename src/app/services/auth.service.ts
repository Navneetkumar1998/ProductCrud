import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(uname:string,pword:string){
    if(uname==='suren' && pword==='123456'){
      return 200;
    }else{
    return 403;
    }
}
}

