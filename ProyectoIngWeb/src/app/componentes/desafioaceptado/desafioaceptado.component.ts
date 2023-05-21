import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import data from '../desafioaceptado/desafios.json';


@Component({
  selector: 'app-desafioaceptado',
  templateUrl: './desafioaceptado.component.html',
  styleUrls: ['./desafioaceptado.component.css']
})
export class DesafioaceptadoComponent {
  desafios = data;
}
