import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Datos} from './datos';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServicioInfoService {
  url:string="http://localhost:8080/ProyectoFormulario/backend/";

  constructor(private servicio:HttpClient) { }

  GuardarDatos(Lista:Array<Datos>):Observable<any>{
     //console.log(Lista);
     return this.servicio.post(`${this.url}guardar.php`,JSON.stringify(Lista));

     //return this.servicio.get(`${this.url}guardar.php`);
  }

  

}