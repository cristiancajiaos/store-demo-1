import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Modules */
import { ComponentsRoutingModule } from './components-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

/* Components */
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';
import { VerificationEmailComponent } from './views/verification-email/verification-email.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HomeComponent, LoginComponent, RegisterComponent, ResetPasswordComponent, VerificationEmailComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class ComponentsModule { }
