import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IconDefinition, faEnvelope, faKey, faSignInAlt, faUserPlus, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

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

  faEnvelope: IconDefinition;
  faKey: IconDefinition;
  faSignInAlt: IconDefinition;
  faUserPlus: IconDefinition;
  faQuestion: IconDefinition;
  faGoogle: IconDefinition;

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

    this.faEnvelope = faEnvelope;
    this.faKey = faKey;
    this.faSignInAlt = faSignInAlt;
    this.faUserPlus = faUserPlus;
    this.faQuestion = faQuestion;
    this.faGoogle = faGoogle;
  }

  async onLogin() {
    const { email, password } = this.form.value;
    try {
      const user = await this.authService.login(email, password);
      if (user && user.user.emailVerified) {
        this.router.navigateByUrl("/home");
      } else if (user) {
        this.router.navigateByUrl('/verification-email');
      } else {
        this.router.navigateByUrl('/register');
      }
    } catch (error) {
      console.log(error);
    }
  }

  onGoogleLogin() {
    try {
      this.authService.loginGoogle();
    } catch (error) {
      console.log(error);
    }
  }

}
