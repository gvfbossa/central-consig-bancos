import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseUrl = 'http://localhost:8080/';

  clientes: Cliente[] = [];

  constructor(private http: HttpClient) {}

  getClienteByCpfAndMatricula(cpf?: string, matricula?: string): Observable<Cliente> {
    let params: any = {};
    if (cpf) params.cpf = cpf;
    if (matricula) params.matricula = matricula;
  
    return this.http.get<Cliente>(`${this.baseUrl}cliente/busca`, { params });
  }

  capturaDados(username: string, password: string): Observable<void> {
    const body = { username, password };
    return this.http.post<void>(`${this.baseUrl}crawler/captura-dados`, body);
  }

  atualizaBlackList(cpf: string): Observable<void> {
    const params = new HttpParams().set('cpf', cpf);
    return this.http.post<void>(`${this.baseUrl}cliente/black-list`, {}, { params });
  }



  atualizaBaseDeDadosCliente(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}api/sheets/download`, {});
  }
  
}
