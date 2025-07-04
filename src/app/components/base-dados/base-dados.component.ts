import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SheetService } from '../../services/sheet.service';
import { GoogleSheet } from '../../models/google-sheet.model';

@Component({
  selector: 'app-base-dados',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './base-dados.component.html',
  styleUrl: './base-dados.component.css'
})

export class BaseDadosComponent {
  sheetsForm: FormGroup;
  errorMessage: string | null = null;
  sheets: GoogleSheet[] = [];

  constructor(
    public sheetService: SheetService,
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
  this.sheetService.getSheets().subscribe({
    next: (data) => {
      this.sheets = data.map(sheet => ({
        ...sheet,
        fileName: this.formatarNome(sheet.fileName)
      }));
    },
    error: () => this.errorMessage = 'Erro ao carregar as abas cadastradas.'
  });
}

private formatarNome(fileName: string): string {
  return fileName
    .replace(/^MARGEM CARTAO CAPITAL - /, '')
    .replace(/\.csv$/, '')
    .trim();
}

atualizarPreferencial(sheet: GoogleSheet) {
  this.sheetService.atualizarSheet(sheet).subscribe({
    next: () => {
      this.sheetsForm.reset();
      this.listarSheets();
      this.errorMessage = null;
    },
    error: () => this.errorMessage = 'Erro ao Atualizar a aba.'
  });
}

inserirSheet() { //TODO - alterar a flag e chamar esse metodo pra fazer o put.
  if (this.sheetsForm.invalid) return;

  const nomeOriginal = this.sheetsForm.value.fileName.trim();
  const nomeComPrefixo = `MARGEM CARTAO CAPITAL - ${nomeOriginal}.csv`;

  const novaSheet: GoogleSheet = {
    ...this.sheetsForm.value,
    fileName: nomeComPrefixo
  };

  this.sheetService.createSheet(novaSheet).subscribe({
    next: () => {
      this.sheetsForm.reset();
      this.listarSheets();
      this.errorMessage = null;
    },
    error: () => this.errorMessage = 'Erro ao salvar a aba.'
  });
}

  removerSheet(fileName: string) {
    this.sheetService.deleteSheetByName(fileName).subscribe({
      next: () => this.listarSheets(),
      error: () => this.errorMessage = 'Erro ao remover a aba.'
    });
  }

}