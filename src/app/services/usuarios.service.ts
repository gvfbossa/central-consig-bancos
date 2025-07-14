import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl = 'https://api-centralconsig-margens-propostas.bossawebsolutions.com.br/usuario';

  constructor(private http: HttpClient) {}

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  addUsuario(usuario: Usuario): Observable<void> {
    return this.http.post<void>(this.baseUrl, usuario);
  }

  updateUsuario(usuario: Usuario): Observable<void> {
    return this.http.put<void>(this.baseUrl, usuario);
  }

  deleteUsuario(username: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${username}`);
  }
}
