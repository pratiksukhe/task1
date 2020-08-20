import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';

interface user {
  email: string;
  firstName: string;
  id: string;
  lastName: string;

  role: string;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users: any[] = [];
  constructor(
    private database: AngularFireDatabase,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.auth
      .getAll()
      .then((result) => {
        console.log(result);
        Object.keys(result).map((key) => {
          this.users.push({ [key]: result[key] });
        });

        console.log(this.users);
      })
      .catch((error) => console.log(error));
  }
}
