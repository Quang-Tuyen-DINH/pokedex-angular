import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url: string = `${environment.pokeUrl}pokemon/`;
  private _pokemonsList: Pokemon[] = [];
  private _nextPageUrl: string = '';
  private _total: number = 0;

  constructor(private http: HttpClient) { }

  get pokemons(): Pokemon[] {
    return this._pokemonsList;
  }
  
  get nextPage(): string {
    return this._nextPageUrl;
  }

  set nextPage(next: string) {
    this._nextPageUrl = next;
  }
  
  get total(): number {
    return this._total;
  }

  set total(total: number) {
    this._total = this._total + total;
  }

  getPokemon(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get<any>(url);
  }

  getNext(): Observable<any> {
    const url = this.nextPage === '' ? `${this.url}?offset=0&limit=${this.total}` : this.nextPage;
    return this.http.get<any>(url);
  }

  getTotal(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getEvolution(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getSpecies(id: number): Observable<any> {
    const url = `${environment.pokeUrl}pokemon-species/${id}`;
    return this.http.get<any>(url);
  }
}
