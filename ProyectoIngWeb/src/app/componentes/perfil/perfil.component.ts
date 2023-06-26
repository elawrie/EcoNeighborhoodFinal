import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from '../../sign-in-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';


interface ApiResponse {
  mensaje: boolean;
  resultado: any; 
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  constructor (private fb: FormBuilder, private http: HttpClient,private signInService: SignInService, private snackBar: MatSnackBar) {

  }

  private apiUrl = 'http://localhost:3000';

  public correo(): void {
    const email: any = this.signInService.signInData.email;
    this.showSnackBar(email);
    // const url = `${this.apiUrl}/registro?email=${encodeURIComponent(email)}`; 

    // const data = {
    //   "email": email, 
    // };

    // this.http.get<ApiResponse>(url, { params: email }).subscribe(
    //     response => {
    //       console.log('GET request successful:', response);
    //       if (response.mensaje === true) {
    //         console.log("usuario es registrado");
    //       }
    //       else {
    //         console.log("usuario no tiene cuenta");
    //       }
    //     },
    //     error => {
    //       console.error('An error occurred:', error);
    //     }
    //   );
    
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }

}
