import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigurationService {
  private baseUrl = 'https://api-centralconsig-margens-propostas.bossawebsolutions.com.br/api/system-configuration';

  constructor(private http: HttpClient) {}

  isPropostaAutomaticaAtiva(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/proposta-automatica`);
  }

  togglePropostaAutomatica(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/proposta-automatica/toggle`, {});
  }
}
