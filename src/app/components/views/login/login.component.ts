import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
