import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearcuentaComponent } from './componentes/crearcuenta/crearcuenta.component';
import { IniciarsesionComponent } from './componentes/iniciarsesion/iniciarsesion.component';

const routes: Routes = [
  { path: 'crearcuenta', component: CrearcuentaComponent },
  { path: 'iniciarsesion', component: IniciarsesionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
