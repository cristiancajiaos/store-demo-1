import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  user$: Observable<any> = this.authService.afAuth.user;
  form: FormGroup;

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  async ngOnInit() {
    this.user$.subscribe(result => {
      if (result != null) {
        this.router.navigateByUrl('/home');
      }
    });

    this.form = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  async onLogin() {
    const { email, password } = this.form.value;
    try {
      const user = await this.authService.login(email, password);
      if (user) {
        this.router.navigateByUrl("/home");
      } else {
        this.toastrService.error('Hubo un error desconocido', 'Error');
      }
    } catch (error) {
      this.toastrService.error(error, 'Error');
    }
  }
}
