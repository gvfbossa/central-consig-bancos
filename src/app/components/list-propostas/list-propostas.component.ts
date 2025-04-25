import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropostaService } from '../../services/proposta.service';
import { Proposta } from '../../models/proposta.model';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SystemConfigurationService } from '../../services/system-configuration.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-proposta-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './list-propostas.component.html',
  styleUrls: ['./list-propostas.component.css']
})
export class PropostaListComponent implements OnInit {
  propostas: Proposta[] = [];
  errorMessage: string | null = null;
  loading: boolean = false
  propostasSelecionadas: Proposta[] = [];
  buscaTexto: string = '';
  propostasFiltradas: Proposta[] = [];
  propostaAutomaticaAtiva: boolean = false;
  carregando: boolean = false;

  constructor(private propostaService: PropostaService, private sysConfigService: SystemConfigurationService, private cdRef: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.sysConfigService.isPropostaAutomaticaAtiva().subscribe(status => {
      this.propostaAutomaticaAtiva = status;
    });

    this.loadPropostas();
  }

  onToggle() {
    this.carregando = true;
    this.sysConfigService.togglePropostaAutomatica().subscribe(() => {
      this.propostaAutomaticaAtiva = !this.propostaAutomaticaAtiva;
      this.carregando = false;
    });
  }

  async loadPropostas(): Promise<void> {
    this.loading = true;

    this.propostaService.getAllPropostas().subscribe({
      next: (res) => {
        this.propostas = res;
        this.errorMessage = null;
        this.loading = false;
        this.propostas = this.propostas.filter(p => !!p.linkAssinatura);
        this.propostasFiltradas = [...this.propostas];
      },
      error: () => {
        this.propostas = [];
        this.errorMessage = 'Erro ao buscar propostas';
      }
    });
  }

  cancelarPropostasSelecionadas() {
    const confirmacao = confirm(
      `Tem certeza que deseja cancelar ${this.propostasSelecionadas.length} proposta(s)?`
    );
  
    if (confirmacao) {
      const numeros = this.propostasSelecionadas.map(p => p.numeroProposta);
  
      this.propostaService.cancelarPropostas(numeros).subscribe({
        next: () => {
          alert('Propostas canceladas com sucesso!');
          this.loadPropostas();
          this.propostasSelecionadas = [];
        },
        error: () => {
          alert('Erro ao cancelar propostas.');
        }
      });
    }
  }

  onSelecionarProposta(proposta: Proposta, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
  
    proposta.selecionada = checkbox.checked;
  
    if (checkbox.checked) {
      this.propostasSelecionadas.push(proposta);
    } else {
      this.propostasSelecionadas = this.propostasSelecionadas.filter(
        (p) => p.numeroProposta !== proposta.numeroProposta
      );
    }
  }
  
  limparSelecao() {
    this.propostas.forEach(proposta => proposta.selecionada = false);
    this.propostasSelecionadas = [];
    this.cdRef.detectChanges();
    this.propostasFiltradas = [...this.propostas];
  }  

  filtrarPropostas() {
    this.propostasFiltradas = this.propostas.filter((proposta) => {
      const numeroProposta = proposta.numeroProposta.toString().toLowerCase();
      const cpfCliente = proposta.cliente.cpf.toLowerCase();
      const nomeCliente = proposta.cliente.nome?.toLowerCase();
      const buscaTextoLower = this.buscaTexto.toLowerCase();

      return (
        numeroProposta.includes(buscaTextoLower) ||
        cpfCliente.includes(buscaTextoLower) ||
        nomeCliente?.includes(buscaTextoLower)
      );
    });
  }

  mostrarPropostasSelecionadas() {
    if (this.propostasSelecionadas.length === 0)
      return
    this.propostasFiltradas = this.propostas.filter(proposta => proposta.selecionada);
  }

  baixarExcelPropostas() {
    let numerosPropostas = this.propostasSelecionadas.map(p => p.numeroProposta);
    
    if (this.propostasSelecionadas.length === 0) {
      numerosPropostas = this.propostas.map(p => p.numeroProposta);
    }
  
    this.propostaService.downloadExcelPropostas(numerosPropostas).subscribe((response) => {
      if (response.body) {
        const file = new Blob([response.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const dataFormatada = new Date().toLocaleDateString('pt-BR');
        const nomeArquivo = "Relatorio_Propostas_" + dataFormatada + ".xlsx";
        FileSaver.saveAs(file, nomeArquivo);
      } else {
        alert('Erro ao baixar o arquivo, tente novamente.');
      }
    });
  }  
  

}
