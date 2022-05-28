import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../components/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url: string = `${environment.pokeUrl}pokemon/`;
  private pokemonsList: Pokemon[] = [];
  private nextPageUrl: string = '';

  constructor(private http: HttpClient) { }

  get pokemons(): Pokemon[] {
    return this.pokemonsList;
  }
  
  get nextPage(): string {
    return this.nextPageUrl;
  }

  set nextPage(next: string) {
    this.nextPageUrl = next;
  }
  
  getType(pokemon: Pokemon): string {
    if(
      pokemon
      && pokemon.types
      && pokemon.types.length > 0
      && pokemon.types[0].type
      && pokemon.types[0].type.name
    ) {
      return pokemon.types[0].type.name;
    } else {
      return '';
    }
  }

  getPokemon(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get<any>(url);
  }

  getNext(): Observable<any> {
    const url = this.nextPage === '' ? `${this.url}?limit=10` : this.nextPage;
    return this.http.get<any>(url);
  }

  getEvolution(id: number): Observable<any> {
    const url = `${environment.pokeUrl}evolution-chain/${id}`;
    return this.http.get<any>(url);
  }

  getSpecies(id: number): Observable<any> {
    const url = `${environment.pokeUrl}pokemon-species/${id}`;
    return this.http.get<any>(url);
  }
}
