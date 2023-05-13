import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearcuentaComponent } from './componentes/crearcuenta/crearcuenta.component';
import { IniciarsesionComponent } from './componentes/iniciarsesion/iniciarsesion.component';
import { PaginaprincipalComponent } from './componentes/paginaprincipal/paginaprincipal.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { DesafioaceptadoComponent } from './componentes/desafioaceptado/desafioaceptado.component';
import { DesafiosComponent } from './componentes/desafios/desafios.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RankingComponent } from './componentes/ranking/ranking.component';
import { SugerenciasComponent } from './componentes/sugerencias/sugerencias.component';
import { WikiComponent } from './componentes/wiki/wiki.component';

const routes: Routes = [
  { path: 'crearcuenta', component: CrearcuentaComponent },
  { path: 'iniciarsesion', component: IniciarsesionComponent },
  { path: 'paginaprincipal', component: PaginaprincipalComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'desafioaceptado', component: DesafioaceptadoComponent },
  { path: 'desafios', component: DesafiosComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'sugerencias', component: SugerenciasComponent },
  { path: 'wiki', component: WikiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
