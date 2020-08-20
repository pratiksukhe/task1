import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { WindowService } from '../../services/window.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signin-with-phone',
  templateUrl: './signin-with-phone.component.html',
  styleUrls: ['./signin-with-phone.component.css'],
})
export class SigninWithPhoneComponent implements OnInit, AfterViewInit {
  windowRef: any;
  phoneNumber: string;
  otp: string;

  disableOTPSendButton = true;

  constructor(
    private windowService: WindowService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.windowRef = this.windowService.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
        callback: (response) => {
          this.disableOTPSendButton = false;
        },
      }
    );
    this.windowRef.recaptchaVerifier.render();
  }

  ngAfterViewInit() {}

  sendOtp() {
    firebase
      .auth()
      .signInWithPhoneNumber(this.phoneNumber, this.windowRef.recaptchaVerifier)
      .then((confirmationResult) => {
        this.windowRef.confirmationResult = confirmationResult;
      });
  }

  verifyOTP() {
    this.windowRef.confirmationResult
      .confirm(this.otp)
      .then((userCredentials) => {
        localStorage.setItem('user', JSON.stringify(userCredentials.user));
        console.log(userCredentials);
        this.toastr.success(
          'SignIn success..!! Welcome' + userCredentials.user.phoneNumber
        );
        this.router.navigateByUrl('/dashboard');
      });
  }
}
