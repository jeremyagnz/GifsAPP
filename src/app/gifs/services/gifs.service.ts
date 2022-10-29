import { HttpClient } from '@angular/common/http';
import { Injectable, LOCALE_ID, QueryList } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Gifs, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'OLUut0emGgPGFFjFt08iLePwz3kbElWv';
  private _historial: string[] = [];

  public resultados: Gifs[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    this.http
      .get<SearchGifsResponse>(`${environment.url}${query}&limit=30`)
      .subscribe( resp => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
