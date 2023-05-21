import { Component } from '@angular/core';
import data from '../wiki/articulos.json';
import data2 from '../wiki/recursosDelDia.json';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent {
  //Se insertan Objectos json de manera aleatoria//
  //Así se elige solo un contenido de la lista escrita en los .json //
  articulos = data;
  recursos = data2;
  //articulos = data[Math.floor(Math.random() * data.length)];
  //recursos = data2[Math.floor(Math.random() * data2.length)];
}


