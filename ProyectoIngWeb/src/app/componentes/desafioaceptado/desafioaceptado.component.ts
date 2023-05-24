import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-desafioaceptado',
  templateUrl: './desafioaceptado.component.html',
  styleUrls: ['./desafioaceptado.component.css']
})

export class DesafioaceptadoComponent {
  //Del objeto json, solo se imprime un desafio aleatorio//
  jsonDesafios : any;
  desafio: any;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('assets/desafios.json').subscribe((res) =>{
      this.jsonDesafios = res;
      const randIndex = Math.floor(Math.random() * this.jsonDesafios.length);
      this.desafio = this.jsonDesafios[randIndex];
    })
  }
}
