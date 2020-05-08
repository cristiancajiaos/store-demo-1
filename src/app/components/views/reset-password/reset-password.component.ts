import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IconDefinition, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [AuthService]
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);

  faEnvelope: IconDefinition;
  faKey: IconDefinition;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: this.email
    });

    this.faEnvelope = faEnvelope;
    this.faKey = faKey;
  }

  async onSubmit() {
    try {
      const email = this.form.value.email;
      await this.authService.resetPassword(email);
      this.toastrService.success(
        "Se envió al correo de tu cuenta, un mensaje para resetear la contraseña",
        "Email enviado"
      );
      this.router.navigateByUrl('/login');
    } catch (error) {
      this.toastrService.error(error, 'Error');
    }

  }

}
