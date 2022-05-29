import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shell/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: Pokemon;
  private _id: number;
  private _name: string;
  private _types: string[];
  private _photoUrl: string;

  set id(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set types(types: string[]) {
    this._types = types;
  }

  get types(): string[] {
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
      if(this.pokemon.id) {
        this.id = this.pokemon.id;
      } else {
        this.id = 0;
      }

      if(this.pokemon.name) {
        this.name = this.pokemon.name;
      } else {
        this.name = 'N/A';
      }

      if(this.pokemon.types && this.pokemon.types.length > 0) {
        const types = this.pokemon.types.map(obj => {
          return obj.type && obj.type.name ? obj.type.name : '';
        })
        this.types = types;
      } else {
        this.types = ['N/A'];
      }

      if(
        this.pokemon.sprites
        && this.pokemon.sprites.other
        && this.pokemon.sprites.other.home
        && this.pokemon.sprites.other.home.front_default
      ) {
        this.photo = this.pokemon.sprites.other.home.front_default;
      } else {
        this.photo = '';
      }
    }
  }
}
