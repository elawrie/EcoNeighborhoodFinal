import { Component } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators, FormsModule} from '@angular/forms';
import { SignInService } from '../../sign-in-service.service';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  mensaje: boolean;
  resultado: any; 
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  title = 'Angular Reactive Form';
  formulario = new FormGroup({
    reciclaje: new FormControl('', [Validators.required]),
    ducha: new FormControl('', [Validators.required]),
    carne: new FormControl('', [Validators.required]),
    botella: new FormControl('', [Validators.required]),
    manejar: new FormControl('', [Validators.required]),
  })

  constructor(private http: HttpClient, private signInService: SignInService) {}

  formValues = {
    Usuario_email: this.signInService.signInData.email,
    gusto1: 0,
    gusto2: 0,
    gusto3: 0,
    gusto4: 0,
    gusto5: 0
  };

  // make a funcion for each radio button 
  public pregunta1(): void {
    this.formValues.gusto1 = 1;
  }

  public pregunta2(): void {
    this.formValues.gusto2 = 1;
  }

  public pregunta3(): void {
    this.formValues.gusto3 = 1;
  }

  public pregunta4(): void {
    this.formValues.gusto4 = 1;
  }

  public pregunta5(): void {
    this.formValues.gusto5 = 1;
  }

  public ingresarDatos(): void {
    
    const apiUrl = 'http://localhost:3000';
    const url = `${apiUrl}/formulario`; 
    this.http.post<ApiResponse>(url, this.formValues).subscribe(
      () => {
        // Handle success
        console.log('Form data saved successfully!');
        console.log("form values");
        console.log(this.formValues);
      },
      (error) => {
        // Handle error
        console.error('Error saving form data:', error);
      }
    );
    // const email: any = this.formulario.get('reciclaje')?.value;
    // const password: any = this.formulario.get('password')?.value;
    

    // this.signInService.signInData = {
    //   email: email,
    //   password: password,
    //   puntos: 0
    // };

    // const data = {
    //   "email": email, 
    //   "password": password, 
    //   "puntos": 0 
    // };

    // this.http.put<any>(url, data)
    //   .subscribe(
    //     response => {
    //       console.log('PUT request successful:', response);
    //     },
    //     error => {
    //       console.error('An error occurred:', error);
    //     }
    //   );
  }

  userForm() {
    console.warn(this.formulario.value);
    this.formulario.reset();
  }
}
