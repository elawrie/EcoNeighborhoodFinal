import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { CrearcuentaComponent } from './componentes/crearcuenta/crearcuenta.component';
import { IniciarsesionComponent } from './componentes/iniciarsesion/iniciarsesion.component';
import { IndexComponent } from './componentes/index/index.component';
import { PaginaprincipalComponent } from './componentes/paginaprincipal/paginaprincipal.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { SugerenciasComponent } from './componentes/sugerencias/sugerencias.component';
import { RankingComponent } from './componentes/ranking/ranking.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { DesafiosComponent } from './componentes/desafios/desafios.component';
import { WikiComponent } from './componentes/wiki/wiki.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { DesafioaceptadoComponent } from './componentes/desafioaceptado/desafioaceptado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'iniciarsesion', component: IniciarsesionComponent },
  { path: 'crearcuenta', component: CrearcuentaComponent },
  { path: 'paginaprincipal', component: PaginaprincipalComponent },
  { path: 'formulario', component: FormularioComponent },
  { path: 'sugerencias', component: SugerenciasComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'desafios', component: DesafiosComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'desafioaceptado', component: DesafioaceptadoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CrearcuentaComponent,
    IniciarsesionComponent,
    IndexComponent,
    PaginaprincipalComponent,
    FormularioComponent,
    SugerenciasComponent,
    RankingComponent,
    CalendarioComponent,
    DesafiosComponent,
    WikiComponent,
    PerfilComponent,
    DesafioaceptadoComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
