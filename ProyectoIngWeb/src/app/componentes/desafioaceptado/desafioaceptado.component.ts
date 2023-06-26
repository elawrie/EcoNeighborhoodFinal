import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-desafioaceptado',
  templateUrl: './desafioaceptado.component.html',
  styleUrls: ['./desafioaceptado.component.css']
})
export class DesafioaceptadoComponent {
  jsonDesafios: any;
  desafio: any;
  currentUser: any;

  //Función que extrae json de assets//
  constructor(private httpClient: HttpClient) {
    this.httpClient.get('assets/desafios.json').subscribe((res) => {
      this.jsonDesafios = res;
      const randIndex = Math.floor(Math.random() * this.jsonDesafios.length);
      this.desafio = this.jsonDesafios[randIndex];
      console.log("desafio: " + this.desafio);
    });
  }

  updateUserInformation() {
    const usuarioEmail = this.currentUser.email;
    const desafiosId = this.desafio.id;
    const status = 1;
    const fechaInicio = new Date().toISOString().split('T')[0];

    const data = {
      Usuario_email: usuarioEmail,
      Desafios_id: desafiosId,
      Status: status,
      Fecha_inicio: fechaInicio
    };

    this.httpClient.post('http://localhost:3000/actualizar-usuario', data).subscribe((res) => {
      console.log('Se actualizan datos con nuevo desafio en usuario');
    });
  }
}

