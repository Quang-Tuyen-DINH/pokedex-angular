import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/components/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  private _name: string;
  private _types: string[];
  private _photoUrl: string;

  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set type(types: string[]) {
    console.log(types)
    this._types = types;
  }

  get type(): string[] {
    return this._types;
  }

  set photo(url: string) {
    this._photoUrl = url;
  }

  get photo(): string {
    return this._photoUrl;
  }

  constructor() { }

  ngOnInit(): void {
    if(this.pokemon) {
      if(this.pokemon.name) {
        this.name = this.pokemon.name;
      } else {
        this.name = 'N/A';
      }

      if(this.pokemon.types && this.pokemon.types.length > 0) {
        const types = this.pokemon.types.map(obj => {
          return obj.type && obj.type.name ? obj.type.name : '';
        })
        this.type = types;
      } else {
        this.type = ['N/A'];
      }

      if(
        this.pokemon.sprites
        && this.pokemon.sprites.other
        && this.pokemon.sprites.other['official-artwork']
        && this.pokemon.sprites.other['official-artwork'].front_default
      ) {
        this.photo = this.pokemon.sprites.other['official-artwork'].front_default;
      } else {
        this.photo = '';
      }
    }
  }

}
