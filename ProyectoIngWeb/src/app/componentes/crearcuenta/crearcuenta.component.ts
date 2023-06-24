import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crearcuenta',
  templateUrl: './crearcuenta.component.html',
  styleUrls: ['./crearcuenta.component.css']
})

export class CrearcuentaComponent implements OnInit {
  title = 'Angular Reactive Form';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')]),
    password2: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$')])
  })

  // FIXME: esta funcion produce errores de jquery para conectar frontend y backend con registar un usuario en la bd
  // EnviarDatos(): void {
  //   console.log("Button clicked!");
  //   const email: string = $("#email").val() as string;
  //   const password: string = $("#password").val() as string;
  //   const puntos: number = 0;
  //   const url: string = "http://localhost:3000";
  //   $.ajax({
  //     data: JSON.stringify({ "email": email, "password": password, "puntos": puntos }),
  //     contentType: "application/json",
  //     type: "PUT",
  //     dataType: "json",
  //     url: url + "/registro",
  //   })
  //     .done(function (data: any, textStatus: string, jqXHR: JQueryXHR) {
  //       if (console && console.log) {
  //         console.log(JSON.stringify(data));
  //       }
  //     })
  //     .fail(function (jqXHR: JQueryXHR, textStatus: string, errorThrown: any) {
  //       if (console && console.log) {
  //         console.log("La solicitud a fallado: " + textStatus);
  //       }
  //     });
  // }

  loginUser() {
    console.warn(this.loginForm.value);
    this.loginForm.reset();
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  get password2() {
    return this.loginForm.get('password2')
  }

  ngOnInit(): void {}

}
