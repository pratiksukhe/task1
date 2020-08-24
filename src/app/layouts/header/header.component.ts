import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../_helpers/auth.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //email: string;
  user: object;
  links: Array<{ text: string; path: string }>;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService
  ) {
    auth.getUser().subscribe((user) => {
      this.user = user;
    });

    this.router.config.unshift(
      {
        path: 'teacher',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../teacher/teacher.module').then((m) => m.TeacherModule),
      },
      {
        path: 'student',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../../student/student.module').then((m) => m.StudentModule),
      }
    );
  }

  ngOnInit(): void {
    this.links = this.auth.getLinks();
  }

  async handleSignout() {
    try {
      const res = await this.auth.signOut();
      this.links = null;
      localStorage.removeItem('user');
      this.router.navigateByUrl('/signin');
      this.toastr.info('Login again to continue');
      //this.email = null;
    } catch (error) {
      this.toastr.error('Something is wrong');
    }
  }
}
