import { Component } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent {
  title = 'Angular Reactive Form';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')]),
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

  ngOnInit(): void {}
}
