import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInService } from '../../sign-in-service.service';

interface ApiResponse {
  mensaje: boolean;
  resultado: any; 
}

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.component.html',
  styleUrls: ['./sugerencias.component.css']
})
export class SugerenciasComponent {

  constructor(private http: HttpClient, private signInService: SignInService) {}

  public delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async sugerencias() {
    const apiUrl = 'http://localhost:3000';
    let respuestas: any[] = [];
    const email: any = this.signInService.signInData.email;
    const url = `${apiUrl}/formulario?email=${encodeURIComponent(email)}`; 

    const params = { Usuario_email: email };

    this.http.get<ApiResponse>(url, { params}).subscribe(
      response => {
        console.log('GET request successful:', response);
        if (response.mensaje === true) {
          console.log('formulario respuestas', response.resultado);
          // mejorPuntos = response.resultado;
          respuestas = response.resultado;
        }
        else {
          console.log("ERROR");
        }
      },
      error => {
        console.error('An error occurred:', error);
      }
    );
    await this.delay(2000);

    const outputDiv = document.getElementById('output');

    if(outputDiv) {
      const valueDiv = document.createElement('div');
      if (respuestas[0].gusto1 === '1') {
        valueDiv.textContent = "Te aconsejamos que recicles un artículo más cada día";
        outputDiv.appendChild(valueDiv);
      }
      if (respuestas[0].gusto2 === '1') {
        valueDiv.textContent = "Te aconsejamos que trates de cortar el tiempo de tu ducha por la mitad";
        outputDiv.appendChild(valueDiv);
      }
      if (respuestas[0].gusto3 === '1') {
        valueDiv.textContent = "Te aconsejamos que pruebes un nuevo tipo de proteína basada en plantas esta semana";
        outputDiv.appendChild(valueDiv);
      }
      if (respuestas[0].gusto4 === '1') {
        valueDiv.textContent = "Te aconsejamos que compres una botella reutilizable cuando puedas";
        outputDiv.appendChild(valueDiv);
      }
      if (respuestas[0].gusto5 === '1') {
        valueDiv.textContent = "Te aconsejamos que hagas un plan para reducir tu tiempo manejando";
        outputDiv.appendChild(valueDiv);
      }
    }
  };

}
