import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, LOCALE_ID, QueryList } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Gifs, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey      : string = 'OLUut0emGgPGFFjFt08iLePwz3kbElWv';
  private servicioUrl :string = 'http://api.giphy.com/v1/gifs'
  private _historial  : string[] = [];

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
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '30')
          .set('q', query);


    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
