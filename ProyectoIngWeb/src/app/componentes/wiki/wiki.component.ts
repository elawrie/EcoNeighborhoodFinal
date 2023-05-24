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
    const randIndexArticulo = Math.floor(Math.random() * this.jsonArticulos.length);
    const randIndexRecurso = Math.floor(Math.random() * this.jsonRecursos.length);
    this.articulo = this.jsonArticulos[randIndexArticulo];
    this.recurso = this.jsonRecursos[randIndexRecurso];
  }
}


