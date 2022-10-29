import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  buscarGifs(query: string) {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
    this.http
      .get<SearchGifsResponse>(`${environment.url}${query}&limit=30`)
      .subscribe( resp => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }
}
