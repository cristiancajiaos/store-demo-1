import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IconDefinition, faSignInAlt, faSignOutAlt, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user$: Observable<any> = this.authService.afAuth.user;

  faSignInAlt: IconDefinition;
  faSignOutAlt: IconDefinition;
  faUserPlus: IconDefinition;
  faUser: IconDefinition;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.faSignInAlt = faSignInAlt;
    this.faSignOutAlt = faSignOutAlt;
    this.faUserPlus = faUserPlus;
    this.faUser = faUser;
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigateByUrl('/home');
    } catch (error) {
      this.toastrService.error(error, 'Error');
    }
  }
}
