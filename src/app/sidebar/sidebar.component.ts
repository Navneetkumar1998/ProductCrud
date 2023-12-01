import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  inputbtn = '';
  
  buttonlist:string[]=["btn1","btn2","btn3","btn4","btn5","btn6"];


  itemClick(button: any) {
    this.inputbtn = button.target.value;
    

    setTimeout(() => {
      this.inputbtn = '';
    }, 3000);
  }
}