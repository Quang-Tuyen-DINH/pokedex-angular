import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartData } from '../../models/chart-data.model';
import { Pokemon } from '../../models/pokemon.model';
import { Species } from '../../models/species.model';
import { Stat } from '../../models/stat.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrls: ['./pokemon-view.component.scss']
})
export class PokemonViewComponent implements OnInit {
  private _id: number;
  private _name: string;
  private _types: string[];
  private _photoUrl: string;
  private _abilities: string[] = [];
  private _baseExp: number;
  private _height: number;
  private _weight: number;
  private _captureRate: number;
  private _habitat: string;
  private _species: Species;
  private _stats: Stat[] = [];
  private _evolutionUrl: string;
  private _speciesError: boolean;
  //Radar Chart
  chartOptions = {
    title: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    scale:{
      //Labels
      pointLabels:{
        fontStyle: "bold",
        fontColor: "#000000de"
      },
      gridLines: {
        color: "#000000de"
      },
      angleLines: {
        color: "#000000de"
      }
    }
  };
  private _chartLabels: string[] = [];
  private _chartData: ChartData[] = [{
    label: '',
    fill: true,
    backgroundColor: '',
    borderColor: '',
    pointBackgroundColor: '',
    pointBorderColor: '#fff',
    data: []
  }];

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

  set species(species: Species) {
    this._species = species;
  }

  get species(): Species {
    return this._species;
  }

  set captureRate(captureRate: number) {
    this._captureRate = captureRate;
  }

  get captureRate(): number {
    return this._captureRate;
  }

  set habitat(habitat: string) {
    this._habitat = habitat;
  }

  get habitat(): string {
    return this._habitat;
  }

  set stats(stats: Stat[]) {
    this._stats = stats;
  }

  get stats(): Stat[] {
    return this._stats;
  }

  set evolutionUrl(evolutionUrl: string) {
    this._evolutionUrl = evolutionUrl;
  }

  get evolutionUrl(): string {
    return this._evolutionUrl;
  }

  set chartLabels(chartLabels: string[]) {
    this._chartLabels = chartLabels;
  }

  get chartLabels(): string[] {
    return this._chartLabels;
  }

  set chartData(chartData: ChartData[]) {
    this._chartData = chartData;
  }

  get chartData(): ChartData[] {
    return this._chartData;
  }

  set speciesError(speciesError: boolean) {
    this._speciesError = speciesError;
  }

  get speciesError(): boolean {
    return this._speciesError;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private pokemon: Pokemon,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    if(this.pokemon) {
      this.setId();
      this.setName();
      this.setType();
      this.setPhoto();
      this.setHeight();
      this.setWeight();
      this.setBaseExp();
      this.setAbilities();
      this.setupChart();
    }

    if(this.pokemon.id) {
      this.getSpecies(this.pokemon.id);
    }
  }

  // ngDoCheck(): void {
  //   if(this.species.evolution_chain.url) {
  //     this.setEvolutionChain();
  //   }
  // }

  private setId(): void {
    if(this.pokemon.id) {
      this.id = this.pokemon.id;
    }
  }

  private setName(): void {
    if(this.pokemon.name) {
      this.name = this.pokemon.name.split('-').join(' ');
    } else {
      this.name = 'N/A';
    }
  }

  private setType(): void {
    if(this.pokemon.types && this.pokemon.types.length > 0) {
      const types = this.pokemon.types.map(obj => {
        return obj.type && obj.type.name ? obj.type.name : '';
      })
      this.types = types;
    }
  }

  private setPhoto(): void {
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

  private setBaseExp(): void {
    if(this.pokemon.base_experience) {
      this.baseExp = this.pokemon.base_experience;
    }
  }

  private setHeight(): void {
    if(this.pokemon.height) {
      this.height = this.pokemon.height;
    }
  }

  private setWeight(): void {
    if(this.pokemon.weight) {
      this.weight = this.pokemon.weight;
    }
  }

  private setCaptureRate(): void {
    if(this.species && this.species.capture_rate) {
      this.captureRate = this.species.capture_rate;
    }
  }

  private sethabitat(): void {
    if(this.species && this.species.habitat && this.species.habitat.name) {
      this.habitat = this.species.habitat.name.split('-').join(' ');
    }
  }

  private setAbilities(): void {
    if(this.pokemon.abilities) {
      this.pokemon.abilities.map(ability => {
        if(ability.ability?.name) {
          this.abilities.push(ability.ability.name.split('-').join(' '))
        }
      })
    }
  }

  convertHeightWeight(value: number): number {
    return value*0.1;
  }

  private setupChart(): void {
    if(this.pokemon.stats) {
      this.pokemon.stats.map(stat => {
        //Set chart labels
        if(stat.stat?.name) {
          let tempStatName: string;
          tempStatName = stat.stat.name.split('-').join(' ').toUpperCase();
          this.chartLabels.push(tempStatName);
        }
        //Set chart stats
        if(stat.base_stat) {
          this.chartData[0].data?.push(stat.base_stat)
        }
        this.stats.push({
          name: stat.stat?.name,
          base_stat: stat.base_stat
        })
      })
      //Set name each element
      this.chartData[0].label = this.toTitleCase(this.name);
    }
  }

  private setEvolutionChain(): void {
    if(this.species && this.species.evolution_chain && this.species.evolution_chain.url) {
      this.evolutionUrl = this.species.evolution_chain.url;
    }
  }

  private toTitleCase(str: string): string {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  private getSpecies(id: number): void{
    this.pokemonService.getSpecies(id).subscribe(response => {
      this.species = response;
      this.setCaptureRate();
      this.sethabitat();
      this.setEvolutionChain();
    }, error => {
      this.speciesError = true;
    })
  }
}
