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
    
  }

  public puntos(): void{
    const puntos: any = this.signInService.signInData.puntos;
    console.log("perfil puntos:");
    console.log(puntos);
    console.log("sign in data:");
    console.log(this.signInService.signInData);
    this.showSnackBar(puntos);
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
    });
  }

}
