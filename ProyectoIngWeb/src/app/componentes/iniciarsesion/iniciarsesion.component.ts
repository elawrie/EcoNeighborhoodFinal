import { Component } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { HttpClient } from '@angular/common/http';

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

  //Configuración recaptcha//
  recaptchaSiteKey = '6LfBHskmAAAAAKIHAFfSwlKI7tzLMS2BkIMfeTmK';
  constructor(private http: HttpClient, private recaptchaV3Service: ReCaptchaV3Service) {}

  verifyUser() {
    this.recaptchaV3Service.execute(this.recaptchaSiteKey, '/login', (token:string) => {
        // Use the token to verify the user
        console.log('reCAPTCHA token:', token);

        // Send the token to the backend
        const data = { token: token };
        this.http.post('/login', data).subscribe(
          (response:any) => {
            console.log('Verification response:', response);
            // Handle the response from the backend
          },
          (error:any) => {
            console.error('Error occurred during verification:', error);
            // Handle the error
          }
        );
      });
    };

  ngOnInit(): void {}
}