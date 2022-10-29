import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'OLUut0emGgPGFFjFt08iLePwz3kbElWv';
  private _historial: string[] = [];

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
    this.http.get(`${environment.url}`)
             .subscribe( (resp:any) => {console.log(resp.data)});
  }
}
