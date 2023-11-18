import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators ,FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm!: FormGroup;
  errorMsg="";

  constructor(private formBuilder: FormBuilder,private auth:AuthService,private router:Router) {
    
    this.formBuilder=formBuilder;
 }

  ngOnInit(): void {
   this.loadLoginForm();
  }

loadLoginForm(){
  this.loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
}

onSubmit(){
let res=null;
  if (this.loginForm.valid) {
    // Form is valid, perform login or other actions
    const formData = this.loginForm.value;
    console.log('Form data:', formData);
    res= this.auth.login(formData.username,formData.password)
  } else {
    // Form is invalid, show error messages or prevent form submission
    console.log("invalid")
  }

  if(res===200){
    this.router.navigate(['product']);
}
if(res===403){
  this.errorMsg="Inavlid Capatcha";
  console.log(this.errorMsg);

  
}

 
  
 }
}

