import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { SearchClienteComponent } from './components/search-cliente/search-cliente.component';
import { PropostaListComponent } from './components/list-propostas/list-propostas.component';
import { GestaoUsuariosComponent } from './components/gestao-usuarios/gestao-usuarios.component';
import { BaseDadosComponent } from './components/base-dados/base-dados.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
     { path: '', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'cliente', component: SearchClienteComponent },
      { path: 'proposta', component: PropostaListComponent },
      { path: 'usuario', component: GestaoUsuariosComponent },
      { path: 'base-dados', component: BaseDadosComponent },
    ]
  }
];
