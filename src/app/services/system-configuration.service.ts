import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemConfigurationService {
  private baseUrl = 'https://centralconsig-backend-cf0104558953.herokuapp.com/api/system-configuration';

  constructor(private http: HttpClient) {}

  isPropostaAutomaticaAtiva(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/proposta-automatica`);
  }

  togglePropostaAutomatica(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/proposta-automatica/toggle`, {});
  }
}
