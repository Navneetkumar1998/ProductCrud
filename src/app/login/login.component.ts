import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup, Validators ,FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm!: FormGroup;
  errorMsg="";

  constructor(private formBuilder: FormBuilder,private auth:AuthService,private router:Router,private toastr:ToastrService) {
    
    this.formBuilder=formBuilder;
 }

  ngOnInit(): void {
   this.loadLoginForm();
  }

loadLoginForm(){
  this.loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(8)]]
  });
}

onSubmit(){
  if(this.loginForm.valid){
    let requestbody={
      "email":this.loginForm.get('username')?.value,
      "password":this.loginForm.get('password')?.value
    }
    this.auth.login(requestbody).subscribe(res=>{
      if(res.status == "200 OK"){
        this.toastr.success("login successfull")
        console.log(res);
        this.router.navigate(['/product']);
      }
    },(error)=>{
      console.log(error);
    })

  }
    
     
      }
    }
    
  

 
  


 
  
 



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder , FormGroup, Validators ,FormControl} from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })

// export class LoginComponent {
//   loginForm!: FormGroup;
//   errorMsg="";

//   constructor(private formBuilder: FormBuilder,private auth:AuthService,private router:Router) {
    
//     this.formBuilder=formBuilder;
//  }

//   ngOnInit(): void {
//    this.loadLoginForm();
//   }

// loadLoginForm(){
//   this.loginForm = this.formBuilder.group({
//     username: ['', [Validators.required, Validators.minLength(3)]],
//     password: ['', [Validators.required, Validators.minLength(6)]]
//   });
// }

// onSubmit(){
// let res=null;
//   if (this.loginForm.valid) {
//     // Form is valid, perform login or other actions
//     const formData = this.loginForm.value;
//     console.log('Form data:', formData);
//     res= this.auth.login(formData.username,formData.password)
//   } else {
//     // Form is invalid, show error messages or prevent form submission
//     console.log("invalid")
//   }

//   if(res===200){
//     this.router.navigate(['product']);
// }
// if(res===403){
//   this.errorMsg="Inavlid Capatcha";
//   console.log(this.errorMsg);

  
// }

 
  
//  }
// }
