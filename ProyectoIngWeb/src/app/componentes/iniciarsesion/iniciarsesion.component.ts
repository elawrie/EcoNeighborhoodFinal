import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignInService } from '../../sign-in-service.service';
import { waitForAsync } from '@angular/core/testing';

interface ApiResponse {
  mensaje: boolean;
  resultado: any; 
}

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarsesionComponent {
  title = 'Angular Reactive Form';
  loginForm: FormGroup;
  recaptchaSiteKey = '6LfBHskmAAAAAKIHAFfSwlKI7tzLMS2BkIMfeTmK';

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar, private signInService: SignInService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')]),
      captcha: new FormControl(['', Validators.required])
    })
  }

  public delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  private apiUrl = 'http://localhost:3000';

  async enviarDatos(): Promise<void> {
    const email: any = this.loginForm.get('email')?.value;
    const password: any = this.loginForm.get('password')?.value;
    const url = `${this.apiUrl}/registro?email=${encodeURIComponent(email)}`; 
    let puntosUsuario: number = 0;

    const data = {
      "email": email, 
      "password": password, 
    };

    this.http.get<ApiResponse>(url, { params: email}).subscribe(
        response => {
          console.log('GET request successful:', response);
          if (response.mensaje === true) {
            console.log("usuario es registrado");
            this.showSnackBar('Usuario ha ingresado sesión');
            console.log('User points:', response.resultado);
            puntosUsuario = response.resultado;
          }
          else {
            console.log("usuario no tiene cuenta");
            this.resetForm(); 
            this.showSnackBar('Usuario no es registrado');
          }
        },
        error => {
          console.error('An error occurred:', error);
        }
      );
      await this.delay(2000);
      const puntos: number= puntosUsuario;
      console.log('User puntos:', puntos); 
      this.signInService.signInData = {
        email: email,
        password: password,
        puntos: puntos
      };
  
      console.log("sign in data enviar datos:");
      console.log(this.signInService.signInData);
      
      // this.setSignInData(email,password,puntos);
  };

  // public setSignInData(email: string, password: string, puntos: number): void {
    
  // };

  // public getPuntos(email: string): number {
  //   const url = `${this.apiUrl}/registro?email=${encodeURIComponent(email)}`;
  //   let puntosUsuario = 0;
  //   this.http.get<ApiResponse>(url).subscribe(
  //     (response) => {
  //       // Use the retrieved data
  //       console.log('User points:', response.resultado);
  //       puntosUsuario = response.resultado;
  //       // Assign the points to a variable or use them directly in your component
  //     },
  //     (error) => {
  //       console.error('Error occurred:', error);
  //       // Handle the error appropriately
  //     }
  //   );
  //   console.log("puntos usuario: ", puntosUsuario);
  //   return puntosUsuario;
  // };

  // FIXME: EL CODIGO DE ACCEDER LOS PUNTOS NO FUNCIONA
//   async fetchData(): Promise<number> {
//     const apiUrl = 'http://localhost:3000';
//     const url = `${apiUrl}/registro?email=${encodeURIComponent(email)}`
//     const response = await fetch(url); 
  
//     if (!response.ok) {
//       throw new Error('Failed to fetch data');
//     }
  
//     const data = await response.json();
//     const result = data.puntos; 
//     const resultNum = parseInt(result, 10);
//     return resultNum;
//   }

//   async fetchData().then(result => {
//     console.log(result); // Use the retrieved value as needed
//   })
//   .catch(error => {
//     console.error(error); // Handle any potential errors
//   });

//   const email: any = this.loginForm.get('email')?.value;
//   const password: any = this.loginForm.get('password')?.value;
//   let puntos: Promise<number> = fetchData();

//   this.signInService.signInData = {
//     email: email,
//     password: password,
//     puntos: puntos
//   };

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }

  loginUser() {
    console.warn(this.loginForm.value);
    this.loginForm.reset();
  }

  // Reset the form
  resetForm() {
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