import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SheetService } from '../../services/sheet.service';
import { GoogleSheet } from '../../models/google-sheet.model';
import { ClienteService } from '../../services/cliente.service';
import { SpinnerComponent } from "../spinner/spinner.component";

@Component({
  selector: 'app-base-dados',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SpinnerComponent
],
  templateUrl: './base-dados.component.html',
  styleUrl: './base-dados.component.css'
})

export class BaseDadosComponent {
  sheetsForm: FormGroup;
  errorMessage: string | null = null;
  sheets: GoogleSheet[] = [];
  loading: boolean = false;

  constructor(
    public sheetService: SheetService,
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {
    this.sheetsForm = this.fb.group({
      fileName: ['', Validators.required],
      url: ['', Validators.required],
      preferencial: [false]
    });

    this.listarSheets();
  }

  listarSheets() {
    this.loading = true
    this.sheetService.getSheets().subscribe({
    next: (data) => {
      this.sheets = data.map(sheet => ({
        ...sheet,
        fileName: this.formatarNome(sheet.fileName)
      }));
      this.loading = false
    },
    error: () => {
      this.loading = false
      this.errorMessage = 'Erro ao carregar as abas cadastradas.'
    }
    });
}

private formatarNome(fileName: string): string {
  return fileName
    .replace(/^MARGEM CARTAO CAPITAL - /, '')
    .replace(/\.csv$/, '')
    .trim();
}

atualizarPreferencial(sheet: GoogleSheet) {
  this.loading = true
  this.sheetService.atualizarSheet(sheet).subscribe({
    next: () => {
      this.sheetsForm.reset();
      this.listarSheets();
      this.errorMessage = null;
    },
    error: () => {
      this.loading = false
      this.errorMessage = 'Erro ao Atualizar a aba.'
    }
  });
}

inserirSheet() {
  if (this.sheetsForm.invalid) return;

  this.loading = true

  const nomeOriginal = this.sheetsForm.value.fileName.trim();
  const nomeComPrefixo = `MARGEM CARTAO CAPITAL - ${nomeOriginal}.csv`;

  const novaSheet: GoogleSheet = {
    ...this.sheetsForm.value,
    fileName: nomeComPrefixo
  };

  this.sheetService.createSheet(novaSheet).subscribe({
    next: () => {
      this.loading = false
      this.sheetsForm.reset();
      this.listarSheets();
      this.errorMessage = null;
    },
    error: () => {
      this.loading = false
      this.errorMessage = 'Erro ao salvar a aba.'
    }
  });
}

  removerSheet(fileName: string) {
    this.loading = true

    this.sheetService.deleteSheetByName(fileName).subscribe({
      next: () => {
        this.loading = false
        this.listarSheets()
      },
      error: () => {
        this.loading = false
        this.errorMessage = 'Erro ao remover a aba.'
      }
    });
  }

  atualizaBaseDeDadosCliente() {
    alert("A Base de dados será Atualizada!");
    this.loading = true
    this.clienteService.atualizaBaseDeDadosCliente().subscribe({
      next: (response) => {
        this.loading = false
        console.log("Resposta recebida:", response);
      },
      error: (err) => {
        this.loading = false
        console.error("Erro na requisição:", err);
      }
    });
  }

}