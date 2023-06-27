import { Component } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  title = 'Angular Reactive Form';
  formulario = new FormGroup({
    reciclaje: new FormControl('', [Validators.required]),
  })

  userForm() {
    console.warn(this.formulario.value);
    this.formulario.reset();
  }
}
