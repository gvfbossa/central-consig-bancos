import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  private baseUrl = 'http://178.156.174.130:8443/'; 

  constructor(private http: HttpClient) {}

  getSheets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}api/sheets`, {});
  }

  deleteSheetByName(nome: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}api/sheets/nome`, {
      params: { nome }
    });
  }
  
  createSheet(sheet: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}api/sheets/nome`, sheet);
  }  
  
}
