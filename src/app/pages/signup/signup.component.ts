import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { passwordChecker } from './password-checker';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private database: AngularFireDatabase,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registerForm = this.formbuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTandC: [false, Validators.requiredTrue],
      },
      {
        validators: passwordChecker('password', 'confirmPassword'),
      }
    );
  }

  get h() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    console.table(this.registerForm.value);
    console.table(this.registerForm);

    const {
      firstName,
      lastName,
      email,
      role,
      password,
    } = this.registerForm.value;

    this.auth
      .signUp(email, password)
      .then((res) => {
        console.log(res);

        const { uid } = res.user;

        this.database.object(`/users/${uid}`).set({
          id: uid,
          firstName: firstName,
          lastName: lastName,
          email: email,
          role: role,
        });
        //localStorage.setItem('user', JSON.stringify(res.user));

        this.toastr.success('SignUp Success..!');
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error) => {
        this.toastr.error('Something is going wrong in signup' + error.message);
      });
    //alert('Success Signup\n' + JSON.stringify(this.registerForm.value));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
