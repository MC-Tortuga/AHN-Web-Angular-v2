import { ifError } from 'assert';
import { Error } from 'tslint/lib/error';
import { AuthenticationService } from '../../services/authentication.service';
import { BusinessService } from '../../services/business.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'ahn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  psw:string;

  form = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
   
  });
  constructor(private businessService:BusinessService, private router:Router, private authService:AuthenticationService ) {
    businessService.getBusinesses(); 
}

  ngOnInit() {
 //   console.log(this.auth.test());
  }
  

  login(){
this.authService.login(this.username,this.psw)
.catch((error:Error) => {

  var errorCode = error.name;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
    
  }



  googleLogin():void{
    //validate login
    this.authService.googleLogin();

  }

  logout() {
this.authService.logout();
  }
  rememberMe():void{

  }

  get email(){
    return this.form.get("email")
  }
  get password(){
    return this.form.get("password")
  }
}
