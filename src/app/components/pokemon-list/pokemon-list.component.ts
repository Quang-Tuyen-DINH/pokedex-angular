import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  subscription: Subscription = new Subscription();

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    if (!this.pokemons.length) {
      this.loadMore();
    }
  }

  get pokemons(): Pokemon[] {
    return this.pokemonService.pokemons;
  }

  loadMore(): void {
    this.isLoading = true;
    this.pokemonService.getNext().subscribe(response => {
      this.pokemonService.nextPage = response.next;
      const details = response.results.map((pkm: any) => this.pokemonService.getPokemon(pkm.name));
      this.subscription = concat(...details).subscribe((response: any) => {
        this.pokemonService.pokemons.push(response);
      });
    }, error => console.log('Error Occurred:', error), () => this.isLoading = false);
  }

  getType(pokemon: any): string {
    return this.pokemonService.getType(pokemon);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
