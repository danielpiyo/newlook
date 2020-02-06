import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AlertComponent } from 'src/app/_directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/_service/login.service';
import { AlertService } from 'src/app/_service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [LoginService, AlertService],
      declarations: [ LoginComponent, AlertComponent ],
       imports: [MaterialModule, RouterTestingModule,
                FormsModule, ReactiveFormsModule,
                HttpClientModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should hold login form', () => {
    expect(fixture.nativeElement.querySelector('[data-test="login-holder"]')).toBeTruthy();
  });

  it('should validate email as required', () => {
    const email = component.loginForm.controls.email;
    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeTruthy();
  });

  it('should validate password as required', () => {
    const password = component.loginForm.controls.password;
    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
  });

  // it('should validate password length greater than 6', () => {
  //   const password = component.loginForm.controls.password;
  //   password.setValue('1234567');
  //   expect(password.valid).toBeFalsy();
  //   expect(password.errors.required).toBeFalsy();
  //   fixture.detectChanges();
  //   expect(password.value.)
  //   expect(password.validator.length).toBeGreaterThan(6);
  // });

  it('should validate email format', () => {
    const email = component.loginForm.controls.email;
    email.setValue('test');
    expect(email.valid).toBeFalsy();
    expect(email.errors.required).toBeFalsy();
    expect(email.errors.pattern).toBeTruthy();
  });

  it('should validate email format correctly', () => {
    const email = component.loginForm.controls.email;
    email.setValue('test@test.com');
    const errors = email.errors || {};

    expect(email.valid).toBeTruthy();
    expect(errors.required).toBeFalsy();
    expect(errors.pattern).toBeFalsy();
  });

  // it('should render email validation message when formControl is submitted and invalid', () => {
  //   expect(fixture.nativeElement.querySelector('[data-test="email-error"]')).toBeFalsy();
  //   expect(fixture.nativeElement.querySelector('[data-test="email-required"]')).toBeFalsy();
  //   component.loginUser();

  //   fixture.detectChanges();
  //   expect(fixture.nativeElement.querySelector('[data-test="email-error"]')).toBeTruthy();
  //   expect(fixture.nativeElement.querySelector('[data-test="email-required"]')).toBeTruthy();
  //   expect(fixture.nativeElement.querySelector('[data-test="email-error"]').textContent).toContain('Please enter a valid email.');
  //   expect(fixture.nativeElement.querySelector('[data-test="email-required"]').textContent).toContain('Email is required');
  // });

  // it('should render password validation message when submited', () => {
  //   const elements: HTMLElement = fixture.nativeElement;
  //   expect(elements.querySelector('#password-error')).toBeFalsy();
  //   expect(elements.querySelector('[data-test="password-short"]')).toBeFalsy();

  //   component.loginUser();
  //   fixture.detectChanges();
  //   expect(elements.querySelector('#password-error')).toBeTruthy();
  //   expect(elements.querySelector('[data-test="password-short"]')).toBeTruthy();
  //   expect(elements.querySelector('[data-test="password-short"]').textContent).
  //   toContain('Password isnt long enough, minimum of 6 characters');
  //   expect(elements.querySelector('#password-error').textContent).toContain('Password is required');
  // });

});
