import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { IconDefinition, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-verification-email",
  templateUrl: "./verification-email.component.html",
  styleUrls: ["./verification-email.component.scss"],
  providers: [AuthService]
})
export class VerificationEmailComponent implements OnInit {
  mail: string;
  user$: Observable<any> = this.authService.afAuth.user;

  faEnvelope: IconDefinition;
  faHome: IconDefinition

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.faEnvelope = faEnvelope;
    this.faHome = faHome;
  }

  onResendEmail() {
    this.authService.sendVerificationEmail();
  }
}
