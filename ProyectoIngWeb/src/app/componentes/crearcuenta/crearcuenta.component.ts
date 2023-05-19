import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crearcuenta',
  templateUrl: './crearcuenta.component.html',
  styleUrls: ['./crearcuenta.component.css']
})

export class CrearcuentaComponent implements OnInit {
  title = 'Angular Reactive Form';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')]),
    password2: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')])
  })

  loginUser() {
    console.warn(this.loginForm.value);
    this.loginForm.reset();
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  get password2() {
    return this.loginForm.get('password2')
  }

  ngOnInit(): void {}

}
