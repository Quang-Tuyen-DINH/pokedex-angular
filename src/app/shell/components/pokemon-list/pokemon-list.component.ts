import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';
import { PokemonService } from 'src/app/shell/services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    if(!this.pokemons.length) {
      this.getTotal();
    }
  }

  get pokemons(): Pokemon[] {
    return this.pokemonService.pokemons;
  }

  get total(): number {
    return this.pokemonService.total;
  }

  getTotal() {
    this.pokemonService.getTotal().subscribe(response => {
      this.pokemonService.total = response.count; 
      this.loadMore();
    }, error => console.log('Error Occurred:', error));
  }

  loadMore(): void {
    this.pokemonService.getNext().subscribe(response => {
      this.pokemonService.nextPage = response.next;
      const details = response.results.map((pkm: any) => this.pokemonService.getPokemon(pkm.name));
      this.subscription = concat(...details).subscribe((response: any) => {
        this.pokemonService.pokemons.push(response);
      });
    }, error => console.log('Error Occurred:', error));
  }

  test() {
    console.log(this.pokemons.length);
    console.log(this.pokemonService.total);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
