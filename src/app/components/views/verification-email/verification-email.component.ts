import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-verification-email",
  templateUrl: "./verification-email.component.html",
  styleUrls: ["./verification-email.component.scss"],
  providers: [AuthService]
})
export class VerificationEmailComponent implements OnInit {
  mail: string;
  user$: Observable<any> = this.authService.afAuth.user;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {

  }

  onResendEmail() {
    this.authService.sendVerificationEmail();
  }
}
