import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon } from '../../models/pokemon.model';
import { Stat } from '../../models/stat.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss']
})
export class PokemonViewComponent implements OnInit {
  @ViewChild('statsChart') statsChart: ElementRef;
  private _id: number;
  private _name: string;
  private _types: string[];
  private _photoUrl: string;
  private _abilities: string[];
  private _baseExp: number;
  private _height: number;
  private _weight: number;
  private _moves: Pokemon["moves"];
  private _species: string;
  private _stats: Stat[] = [];
  private _encouters: string[];
  private _evolutionChain: any;

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

  set abilities(abilities: string[]) {
    this._abilities = abilities;
  }

  get abilities(): string[] {
    return this._abilities;
  }

  set baseExp(baseExp: number) {
    this._baseExp = baseExp;
  }

  get baseExp(): number {
    return this._baseExp;
  }

  set height(height: number) {
    this._height = height;
  }

  get height(): number {
    return this._height;
  }

  set weight(weight: number) {
    this._weight = weight;
  }

  get weight(): number {
    return this._weight;
  }

  set stats(stats: Stat[]) {
    this._stats = stats;
  }

  get stats(): Stat[] {
    return this._stats;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public pokemon: Pokemon,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    if(this.pokemon) {
      //Set id
      if(this.pokemon.id) {
        this.id = this.pokemon.id;
      } else {
        this.id = 0;
      }
      
      //Set name
      if(this.pokemon.name) {
        this.name = this.pokemon.name;
      } else {
        this.name = 'N/A';
      }
      
      //Set type
      if(this.pokemon.types && this.pokemon.types.length > 0) {
        const types = this.pokemon.types.map(obj => {
          return obj.type && obj.type.name ? obj.type.name : '';
        })
        this.types = types;
      } else {
        this.types = ['N/A'];
      }
      
      //Set photo
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

      //Set stats
      if(this.pokemon.stats) {
        this.pokemon.stats.map(stat => {
          this.stats.push({
            name: stat.stat?.name,
            base_stat: stat.base_stat
          })
        })
        this.drawStatsChart(this.stats);
      } else {
        this.stats = [];
      }
    }
  }
  
  drawStatsChart(stats: Stat[]) {
    this.statsChart.nativeElement.innerHTML = 'HELLO';
  }
}
