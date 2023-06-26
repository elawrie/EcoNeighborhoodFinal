import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent {
  title = 'Angular Reactive Form';
  loginForm: FormGroup;
  recaptchaSiteKey = '6LfBHskmAAAAAKIHAFfSwlKI7tzLMS2BkIMfeTmK';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')]],
      captcha: ['', Validators.required]
    });
  }

  // private apiUrl = 'http://localhost:3000';

  // public enviarDatos(): void {
  //   const email: any = this.loginForm.get('email')?.value;
  //   const password: any = this.loginForm.get('password')?.value;
  //   const url = `${this.apiUrl}/registro`; 

  //   const data = {
  //     "email": email, 
  //     "password": password, 
  //   };

  //   this.http.get<any>(url, data)
  //     .subscribe(
  //       response => {
  //         console.log('GET request successful:', response);
  //       },
  //       error => {
  //         console.error('An error occurred:', error);
  //       }
  //     );
  // }

  loginUser() {
    console.warn(this.loginForm.value);
    this.loginForm.reset();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  //Codigo de captcha antiguo//
  /*
  verifyUser(response: string) {
    console.log('reCAPTCHA response:', response);

    // Send the response to the backend for verification
    const data = { response };
    this.http.post('/login', data).subscribe(
      (response: any) => {
        console.log('Verification response:', response);
        // Handle the response from the backend
      },
      (error: any) => {
        console.error('Error occurred during verification:', error);
        // Handle the error
      }
    );
  }

  onCaptchaResolved(response: string): void {
    this.loginForm.patchValue({
      captcha: response
    });
  }
  */

  public resolved(captchaResponse: string) { 
    console.log(`Resolved captcha with response: ${captchaResponse}`); 
    }
}