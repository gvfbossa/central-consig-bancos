import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleSheet } from '../models/google-sheet.model';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  private baseUrl = 'https://178.156.174.130:8443/'; 

  constructor(private http: HttpClient) {}

  getSheets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}api/sheets`, {});
  }

deleteSheetByName(nome: string): Observable<void> {
  const nomeArquivo = `MARGEM CARTAO CAPITAL - ${nome}.csv`;
  const nomeCodificado = encodeURIComponent(nomeArquivo);
  return this.http.delete<void>(`${this.baseUrl}api/sheets/${nomeCodificado}`);
}
  
  createSheet(sheet: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}api/sheets/nome`, sheet);
  }  

  atualizarSheet(sheet: GoogleSheet): Observable<void> {
   return this.http.post<any>(`${this.baseUrl}api/sheets/nome`, sheet); 
  }
  
}
