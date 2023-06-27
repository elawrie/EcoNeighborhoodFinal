import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignInService } from '../../sign-in-service.service';

interface ApiResponse {
  mensaje: boolean;
  resultado: any; 
}

@Component({
  selector: 'app-desafioaceptado',
  templateUrl: './desafioaceptado.component.html',
  styleUrls: ['./desafioaceptado.component.css']
})
export class DesafioaceptadoComponent implements OnInit {
  jsonDesafios: any;
  desafio: any;
  currentUser: any;

  constructor(private httpClient: HttpClient, private signInService: SignInService) {
  }

  ngOnInit(): void {
    // Función que extrae json de assets
    this.httpClient.get('assets/desafios.json').subscribe((res) => {
      this.jsonDesafios = res;
      const randIndex = Math.floor(Math.random() * this.jsonDesafios.length);
      this.desafio = this.jsonDesafios[randIndex];
      console.log("desafio: " + this.desafio);

      this.updateUserInformationIfReady();
    });
  }

  updateUserInformationIfReady() {
    if (this.desafio && this.signInService.signInData && this.signInService.signInData.email) {
      const usuarioEmail = this.signInService.signInData.email;
      console.log("email: " + usuarioEmail);
      const desafiosId = this.desafio.id;
      const status = 1;
      const fechaInicio = new Date().toISOString().split('T')[0];

      const data = {
        Usuario_email: usuarioEmail,
        Desafios_id: desafiosId,
        Status: status,
        Fecha_inicio: fechaInicio
      };
      this.signInService.signInData.puntos += 1;
      console.log("DESAFIO ACEPTADO, PUNTO ANADIDO");

      const apiUrl = 'http://localhost:3000';
      const url = `${apiUrl}/desafioaceptado?email=${encodeURIComponent(this.signInService.signInData.email)}`; 
      this.httpClient.post<ApiResponse>(url, this.signInService.signInData.email).subscribe(
        (response) => {
          // Handle success
          console.log('Point incremented successfully!');
          console.log("VALOR DEL PUNTO");
          console.log(response);
        },
        (error) => {
          // Handle error
          console.error('Error saving form data:', error);
        }
      );

      console.log("myData: " + JSON.stringify(data));
      this.httpClient.post('http://localhost:3000/actualizar-usuario', data).subscribe((res) => {
        console.log('Se actualizan datos con nuevo desafio en usuario');
      });
    }
  }
}