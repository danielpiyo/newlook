import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { LoginService, AlertService } from 'src/app/_service';
import { AdminLogin, AdminLoginResponse } from 'src/app/_model/login.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

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
      email: ['', [ Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      password: ['', [ Validators.required, Validators.minLength(6)]]
    });
  }

  loginUser() {
    this.loading = true;
    const formData = this.loginForm.value;

    const payload: AdminLogin = {
      email: formData.email,
      password: formData.password
    };
   if(formData.email != "" || formData.password != ""){ 
    this.loginSubscription = this.loginService.adminLogIn(payload)
    .subscribe((data: AdminLoginResponse) => {
      this.currentPerson = data.user;
      if (data.token) {
        // storing the token
        localStorage.setItem('currentToken', JSON.stringify(data.token));
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        switch (this.currentPerson.role) {
          case 'technician':
            this.alertService.success('You have succesfully Loged In as a technician');
            this.router.navigate(['/tech']);
            break;
          case 'admin':
            this.alertService.success('You have succesfully Loged In as an Administrator');
            this.router.navigate(['/admin']);
            this.loading = false;
            break;
        }
      }
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
