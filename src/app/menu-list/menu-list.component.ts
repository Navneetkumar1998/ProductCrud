import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
input:any
itemname:any
clickeditem:any
values: any;

constructor(private toastr:ToastrService){
  
}


  menuproductlist:string []=['Laptop','Mobile','Joystick']
  parentComp="";
  @ViewChild(EditorComponent) editor!: EditorComponent;

  additem(){
    this.menuproductlist.push(this.input);
    this.itemname=this.input
    this.toastr.success(this.itemname+" "+"is added");
    this.input="";
  }

  // itemadded(){
  //   alert(this.itemname);
  // }

  onClick(event:any){
    this.clickeditem=event.target.value;
  }


  saveBtn(data:any){
    this.input=data;
   // console.log(this.input)
   
    
}

showData(){
  // console.log(this.input.value);
  this.values=this.input.value;
  window.alert(this.values);

}

  

  clrBtn(){
    this.editor.cleartextArea();
  }



  



  
  
  }
  


