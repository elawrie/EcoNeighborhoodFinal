import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import data from '../desafioaceptado/desafios.json';


@Component({
  selector: 'app-desafioaceptado',
  templateUrl: './desafioaceptado.component.html',
  styleUrls: ['./desafioaceptado.component.css']
})
export class DesafioaceptadoComponent {
  jsondesafios = data;
  desafio: any;

  constructor() {
    const randIndex = Math.floor(Math.random() * this.jsondesafios.length);
    this.desafio = this.jsondesafios[randIndex];
  }


}
