import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultClienteComponent } from '../result-cliente/result-cliente.component';
import { Cliente } from '../../models/cliente.model';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-search-cliente',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResultClienteComponent
  ],
  templateUrl: './search-cliente.component.html',
  styleUrls: ['./search-cliente.component.css'],
})
export class SearchClienteComponent {
  clienteForm: FormGroup;
  errorMessage: string | null = null;
  cliente: Cliente | null = null;
  dataInicio: any;
  
  constructor(
    public clienteService: ClienteService,
    private fb: FormBuilder
  ) {
    this.clienteForm = this.fb.group({
      cpf: ['', [Validators.pattern('[0-9]{11}')]],
      matricula: ['']
    });
  }

  onSearch() {
    const { cpf, matricula } = this.clienteForm.value;
  
    if (!cpf && !matricula) {
      this.errorMessage = 'Informe pelo menos CPF ou Matrícula';
      this.cliente = null;
      return;
    }
  
    this.clienteService.getClienteByCpfAndMatricula(cpf, matricula).subscribe({
      next: (response) => {
        this.cliente = response;
        if (this.cliente && this.cliente.vinculos) {
          this.cliente.vinculos = this.cliente.vinculos.filter(vinculo => vinculo.orgao && vinculo.orgao.trim() !== '');
          
          this.cliente.vinculos.forEach(vinculo => {
            vinculo.historicos = vinculo.historicos ? vinculo.historicos.filter(historico => historico.dataConsulta && historico.dataConsulta.trim() !== '') : [];
          });
          console.log('CLIENTE', this.cliente)
        }
        this.errorMessage = null;
      },
      error: (err) => {
        this.cliente = null;
        this.errorMessage = 'Cliente não encontrado ou erro na requisição';
      },
    });
  }

  atualizaBaseDeDadosCliente() {
    alert("A Base de dados será Atualizada!");
    this.clienteService.atualizaBaseDeDadosCliente().subscribe({
      next: (response) => {
        console.log("Resposta recebida:", response);
      },
      error: (err) => {
        console.error("Erro na requisição:", err);
      }
    });
  }
  
  onInputChange(event: any) {
    this.dataInicio = event.target.value;
  }

  relatorioMargensCliente() {
    if (this.dataInicio === undefined)
      this.dataInicio = new Date()

    console.log('dataInicio ', this.dataInicio)
    this.clienteService.relatorioMargensCliente(this.dataInicio).subscribe((response) => {
          if (response.body) {
            const file = new Blob([response.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const dataFormatada = new Date().toLocaleDateString('pt-BR');
            const nomeArquivo = "Relatorio_Clientes_Margens_" + dataFormatada + ".xlsx";
            FileSaver.saveAs(file, nomeArquivo);
          } else {
            alert('Erro ao baixar o arquivo, tente novamente.');
          }
        });
  }

}
