import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Output() saveBtnEvent= new EventEmitter<any>()
  editor!: FormGroup;
  textData:string="";
  editor_variable=true;


  constructor(private formBuilder:FormBuilder){

  }
 
  ngOnInit(): void {
    this.editor=new FormGroup({
      textareas:new FormControl()
    })

    this.saveBtnEvent.emit(this.editor.get("textareas"));
    
  }

  cleartextArea(){
    this.editor.get("textareas")?.setValue("");
    }



  
  }



  
 
   


