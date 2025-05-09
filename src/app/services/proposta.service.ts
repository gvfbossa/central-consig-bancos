import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposta } from '../models/proposta.model';

@Injectable({
  providedIn: 'root',
})
export class PropostaService {
  private baseUrl = 'http://178.156.174.130:8080/proposta';

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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.baseUrl}/excel`, numeros, {
      headers,
      responseType: 'blob',
      observe: 'response'
    });
  }

  marcarPropostaComoProcessada(numeroProposta: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${numeroProposta}/processa`, null);
  }
  

}
