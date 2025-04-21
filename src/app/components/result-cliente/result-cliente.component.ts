import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-cliente.component.html',
  styleUrls: ['./result-cliente.component.css']
})
export class ResultClienteComponent {
  @Input() cliente: Cliente | null = null;

  constructor(private clienteService: ClienteService) {}

  atualizaBlackList(cpf: string): void {
    if (!cpf) return;

    this.clienteService.atualizaBlackList(cpf).subscribe({
      next: () => {
        if (this.cliente) {
          this.cliente.blackList = !this.cliente.blackList;
        }
      },
      error: (err) => {
        console.error('Erro ao atualizar BlackList:', err);
      }
    });
  }
  
}
