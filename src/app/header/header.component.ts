import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  
input1:any;

  constructor(private router:Router){
    
  }

  onLogout() {
    this.router.navigate(['/login']);
  }

  onClick(events:any){
    this.input1=events.target.value;

    setTimeout(()=>{
      this.input1="";
    },3000)

  }

}
