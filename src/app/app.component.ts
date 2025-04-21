import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'centralconsig-crawler-fe';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    // const username = '18761619817_900411';
    // const password = 'Sucesso@250';

    // this.clienteService.capturaDados(username, password).subscribe({
    //   next: () => {
    //     console.log('Dados capturados com sucesso');
    //   },
    //   error: (err) => {
    //     console.error('Erro ao capturar dados', err);
    //   }
    // });
  }

}
