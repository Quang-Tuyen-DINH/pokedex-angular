import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { EvolutionChain } from 'src/app/shell/models/evolution-chain.model';
import { Pokemon } from 'src/app/shell/models/pokemon.model';
import { PokemonService } from 'src/app/shell/services/pokemon.service';

@Component({
  selector: 'app-evolution-chain',
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./evolution-chain.component.scss']
})
export class EvolutionChainComponent implements OnInit, DoCheck {
  @Input() evolutionUrl: string;
  private _evolutionChain: EvolutionChain;
  private _pokemonsChain: Pokemon[];

  set evolutionChain(chain: EvolutionChain) {
    this._evolutionChain = chain;
  }

  get evolutionChain(): EvolutionChain {
    return this._evolutionChain;
  }

  set pokemonChain(pokemonChain: Pokemon[]) {
    this._pokemonsChain = pokemonChain;
  }

  get pokemonChain(): Pokemon[] {
    return this._pokemonsChain;
  }

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    if(this.evolutionUrl) {
      this.getEvolutions(this.evolutionUrl);
    }
  }

  ngDoCheck() {
  }

  private getEvolutions(url: string): void {
    this.pokemonService.getEvolution(url).subscribe(response => {
      this.evolutionChain = response.chain;
      this.getPokemonsNames(this.evolutionChain);
    })
  }

  private getPokemonsNames(evolutions: EvolutionChain): void {
    let evoChain = [];
    var evoData: any = evolutions;

    do {
      evoChain.push({
        "species_name": evoData.species!.name
      });

      evoData = evoData["evolves_to"][0];
    } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
  }
}
