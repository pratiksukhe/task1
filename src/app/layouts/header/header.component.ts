import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email: string;
  phoneNumber: string;
  user: object;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    auth.getUser().subscribe((user) => {
      console.log(user);

      this.user = user;
    });
  }

  ngOnInit(): void {}

  async handleSignout() {
    try {
      const res = await this.auth.signOut();
      this.router.navigateByUrl('/signin');
      this.toastr.info('Login again to continue');
      this.email = null;
    } catch (error) {
      this.toastr.error('Something is wrong');
    }
  }
}
