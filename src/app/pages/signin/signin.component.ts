import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  id: string;
  users: any[] = [];
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get h() {
    return this.signinForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.signinForm.invalid) {
      return;
    }

    const { email, password } = this.signinForm.value;
    this.auth
      .signIn(email, password)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.toastr.success('SignIn Success...!!');
        this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        this.toastr.error('Something is wrong' + error.message);
      });

    //alert('Success Signin\n' + JSON.stringify(this.signinForm.value));
  }
}
