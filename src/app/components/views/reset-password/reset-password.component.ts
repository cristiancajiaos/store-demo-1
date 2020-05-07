import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      email: this.email
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
