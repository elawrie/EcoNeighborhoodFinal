import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInService } from '../../sign-in-service.service';

interface ApiResponse {
  mensaje: boolean;
  resultado: any; 
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})

export class RankingComponent {

  constructor(private http: HttpClient, private signInService: SignInService) {}

  public delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async ranking() {
    const puntos: any = this.signInService.signInData.puntos;
    console.log("perfil puntos:");
    console.log(puntos);
    console.log("sign in data:");
    console.log(this.signInService.signInData);
    const apiUrl = 'http://localhost:3000';
    let mejorPuntos: any[] = [];
    const url = `${apiUrl}/ranking`; 

    this.http.get<ApiResponse>(url).subscribe(
      response => {
        console.log('GET request successful:', response);
        if (response.mensaje === true) {
          console.log('mejor points:', response.resultado);
          // mejorPuntos = response.resultado;
          mejorPuntos = response.resultado;
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
      for (let i = 0; i < mejorPuntos.length; ++i) {
        const valueDiv = document.createElement('div');
        valueDiv.textContent = "Correo: " + mejorPuntos[i].email + " Puntos: " + mejorPuntos[i].puntos;
        outputDiv.appendChild(valueDiv);
      }
    }
  };
}
