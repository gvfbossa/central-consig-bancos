import { Cliente } from './cliente.model';

export interface Proposta {
  selecionada: boolean;
  cliente: Cliente;
  numeroProposta: string;
  linkAssinatura: string;
  valorLiberado: number;
  valorParcela: number;
  dataCadastro: string;
  processada: boolean;
}
