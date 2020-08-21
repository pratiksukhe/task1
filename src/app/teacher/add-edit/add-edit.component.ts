import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { pipe } from 'rxjs';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  id: string;
  submitted = false;
  loading = false;
  editForm: FormGroup;
  user: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
    });

    this.auth
      .getById(this.id)
      .then((result) => {
        Object.keys(result).map((key) => {
          this.user.push(result[key]);
        });
        this.f.firstName.setValue(result.firstName);
        this.f.lastName.setValue(result.lastName);
        this.f.role.setValue(result.role);
        this.f.email.setValue(result.email);
      })
      .catch((error) => {
        this.toastr.error('Something is wrong');
        console.log(error);
      });
  }

  get f() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    this.loading = true;
    this.db
      .object(`/users/${this.id}`)
      .update({
        firstName: this.f.firstName.value,
        lastName: this.f.lastName.value,
        email: this.f.email.value,
        role: this.f.role.value,
      })
      .then((res) => {
        this.toastr.success('Update successfully...!!');
        this.router.navigateByUrl('/teacher');
      })
      .catch((error) => {
        this.toastr.error('Something is wrong');
        console.log(error);
      });
  }
}
