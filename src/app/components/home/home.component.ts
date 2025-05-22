import { Component } from '@angular/core';
import { SearchClienteComponent } from "../search-cliente/search-cliente.component";
import { AppComponent } from "../../app.component";
import { PropostaListComponent } from '../list-propostas/list-propostas.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { BaseDadosComponent } from "../base-dados/base-dados.component";
import { GestaoUsuariosComponent } from "../gestao-usuarios/gestao-usuarios.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchClienteComponent, PropostaListComponent, HeaderComponent, FooterComponent, BaseDadosComponent, GestaoUsuariosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
