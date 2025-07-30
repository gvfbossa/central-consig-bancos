import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemConfiguration } from '../models/system-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigurationService {
  private baseUrl = 'https://api-centralconsig-margens-propostas.bossawebsolutions.com.br/api/system-configuration';

  constructor(private http: HttpClient) { }

  getConfiguracoes(): Observable<SystemConfiguration> {
    return this.http.get<SystemConfiguration>(`${this.baseUrl}/proposta-automatica`);
  }

  atualizarConfiguracoes(propostaAutomatica: boolean, propostaAutomaticaPlanilha: boolean): Observable<void> {
    const body = {
      propostaAutomatica,
      propostaAutomaticaPlanilha
    }
    return this.http.post<void>(`${this.baseUrl}/proposta-automatica/toggle`, body);
  }

}
