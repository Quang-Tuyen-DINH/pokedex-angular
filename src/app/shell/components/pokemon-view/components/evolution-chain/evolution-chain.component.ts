import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { concat, Subscription } from 'rxjs';
import { EvolutionChain } from 'src/app/shell/models/evolution-chain.model';
import { Pokemon } from 'src/app/shell/models/pokemon.model';
import { PokemonService } from 'src/app/shell/services/pokemon.service';
import { PokemonViewComponent } from '../../pokemon-view.component';

@Component({
  selector: 'app-evolution-chain',
  templateUrl: './evolution-chain.component.html',
  styleUrls: ['./evolution-chain.component.scss']
})
export class EvolutionChainComponent implements OnInit, OnDestroy {
  @Input() evolutionUrl: string;
  private evolutionSubscription: Subscription = new Subscription();
  private _evolutionChain: EvolutionChain;
  private _pokemonsChain: Pokemon[] = [];

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
    private pokemonService: PokemonService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if(this.evolutionUrl) {
      this.getEvolutions(this.evolutionUrl);
    }
  }

  private getEvolutions(url: string): void {
    this.pokemonService.getEvolution(url).subscribe(response => {
      this.evolutionChain = response.chain;
      this.getPokemons(this.evolutionChain);
    })
  }

  private getPokemons(evolutions: EvolutionChain): void {
    let evoChain = [];
    var evoData: any = evolutions;

    while (!!evoData && evoData.hasOwnProperty("evolves_to")) {
      evoChain.push({
        "species_name": evoData.species!.name
      });
      evoData = evoData["evolves_to"][0];
    }

    const details = evoChain.map((species: any) => this.pokemonService.getPokemon(species.species_name));
    this.evolutionSubscription = concat(...details).subscribe(response => {
      this.pokemonChain.push(response);
    })
  }

  openPokemonDialog(pokemon: Pokemon) {
    this.dialog.open(PokemonViewComponent, {
      panelClass: 'pokemon-view-dialog',
      width: '100%',
      height: '100%',
      data: pokemon
    });
  }

  ngOnDestroy() {
    this.evolutionSubscription.unsubscribe();
  }
}
