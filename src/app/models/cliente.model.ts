export interface HistoricoConsulta {
  margemCredito: string | null;
  autorizacaoCredito: string | null;
  situacaoCredito: string | null;
  margemBeneficio: string | null;
  autorizacaoBeneficio: string | null;
  situacaoBeneficio: string | null;
  dataConsulta: string | null;
}

export interface Vinculo {
  tipoVinculo: string;
  orgao: string;
  matriculaPensionista: string;
  matriculaInstituidor: string | null;
  historicos: HistoricoConsulta[] | null;
}

export interface Cliente {
  cpf: string;
  nome: string | null;
  telefone: string | null;
  casa?: boolean;
  blackList: boolean;
  vinculos: Vinculo[];
}