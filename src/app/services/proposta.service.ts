import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposta } from '../models/proposta.model';

@Injectable({
  providedIn: 'root',
})
export class PropostaService {
  private baseUrl = 'http://localhost:8080/proposta';

  constructor(private http: HttpClient) {}

  getPropostaByNumero(numero: string): Observable<Proposta> {
    return this.http.get<Proposta>(`${this.baseUrl}/numero`, { params: { numero } });
  }

  cancelaPropostas(numeros: string[]): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cancelamento`, { body: numeros });
  }

  getAllPropostas(): Observable<Proposta[]> {
    return this.http.get<Proposta[]>(this.baseUrl);
  }

  cancelarPropostas(numeros: string[]): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cancelamento`, {
      body: numeros
    });
  }
  
  downloadExcelPropostas(numeros: string[]): Observable<HttpResponse<Blob>> {
    return this.http.post(`${this.baseUrl}/excel`, numeros, {
      responseType: 'blob',
      observe: 'response'
    });
  }

}
