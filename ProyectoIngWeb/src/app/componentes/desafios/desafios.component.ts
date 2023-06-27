import { Component } from '@angular/core';
import { SignInService } from '../../sign-in-service.service';

@Component({
  selector: 'app-desafios',
  templateUrl: './desafios.component.html',
  styleUrls: ['./desafios.component.css']
})
export class DesafiosComponent {
  constructor(private signInService: SignInService) {}

  public agregarPunto() {
    console.log("DESAFIO ACEPTADO, PUNTO ANADIDO");
    this.signInService.signInData.puntos += 1;
  }
}
