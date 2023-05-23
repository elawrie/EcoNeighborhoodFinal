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
  jsonArticulos = data;
  jsonRecursos = data2;
  articulo : any;
  recurso : any;

  constructor(){
    const randIndex = Math.floor(Math.random() * this.jsonArticulos.length);
    this.articulo = this.jsonArticulos[randIndex];
    this.recurso = this.jsonRecursos[randIndex];
  }
}


