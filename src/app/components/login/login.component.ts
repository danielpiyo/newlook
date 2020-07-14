import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { LoginService, AlertService } from 'src/app/_service';
import { Login, LoginResponse } from 'src/app/_model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loading = false;
  currentPerson: any;
  loginSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private loginService: LoginService
  ) { }

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit() {

    this.loginForm = this.fb.group({
      // email: ['', [
      //   Validators.required,
      //   Validators.pattern('[^ @]*@[^ @]*')]],
      // password: ['', Validators.required]
      username: ['', [ Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [ Validators.required, Validators.minLength(6)]]
    });
  }

  loginUser() {
    this.loading = true;
    const formData = this.loginForm.value;

    const payload: Login = {
      username: formData.username + "@cereals",
      password: formData.password
    };
   if(formData.username != "" || formData.password != ""){ 
    this.loginSubscription = this.loginService.logIn(payload)
    .subscribe((data: LoginResponse) => {
      this.currentPerson = data.user;
        // storing the token
        localStorage.setItem('currentToken', JSON.stringify(data.token));
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        this.alertService.success('You have succesfully Loged In as a User');
        this.router.navigate(['/user']);    
    }, error => {
      this.loading = false;
      this.alertService.error(error.error.message);
      console.log(error);
    });
   } else{
     this.loading = false;
     this.alertService.error('Please Enter Detaild to Login');
   }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  ngonDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
