import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SignInService } from '../../sign-in-service.service';


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

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private signInService: SignInService) {}

  public updateData(): void {
    const email: any = this.loginForm.get('email')?.value;
    const password: any = this.loginForm.get('password')?.value;
    const url = `${this.apiUrl}/registro`; 

    this.signInService.signInData = {
      email: email,
      password: password,
      puntos: 0
    };

    const data = {
      "email": email, 
      "password": password, 
      "puntos": 0 
    };

    this.http.put<any>(url, data)
      .subscribe(
        response => {
          console.log('PUT request successful:', response);
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
  }

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
