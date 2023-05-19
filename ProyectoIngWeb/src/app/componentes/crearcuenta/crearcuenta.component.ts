import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder,FormGroup, Validators} from '@angular/forms';
import {ServicioInfoService} from '../../servicio-info.service';
import {Datos} from '../../datos';

@Component({
  selector: 'app-crearcuenta',
  templateUrl: './crearcuenta.component.html',
  styleUrls: ['./crearcuenta.component.css']
})

export class CrearcuentaComponent implements OnInit {

  formulario:FormGroup;

  constructor(private fb:FormBuilder,private servicio:ServicioInfoService) {
     this.formulario=this.fb.group({
       email:['',[Validators.required]],
       password:['',[Validators.required]],
       password2:['',[Validators.required]]
     });
  }

  ngOnInit(): void {
  }
  

  EnviarDatos(){
    let lista:Array<Datos>=[{
       email:this.formulario.get('email')?.value,
       password:this.formulario.get('password')?.value,
       password2:this.formulario.get('password2')?.value
      }
    ];

    this.servicio.GuardarDatos(lista).subscribe(datos=>{
      //console.log("lo que estoy recibiendo");  
      console.log(datos);
    });
 
    
  }

}
