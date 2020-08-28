import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.auth
      .getAll()
      .then((result) => {
        console.log(result);
        Object.keys(result).map((key) => {
          this.users.push(result[key]);
        });

        console.log(this.users);
      })
      .catch((error) => console.log(error));
  }

  deleteUser(id) {
    this.db.object(`/users/${id}`).remove();
    this.toastr.success('deleted successfully.!!');

    this.auth
      .getAll()
      .then((result) => {
        console.log(result);
        Object.keys(result).map((key) => {
          this.users.push(result[key]);
        });

        console.log(this.users);
      })
      .catch((error) => console.log(error));
    this.router.navigateByUrl('/teacher');
  }
}
