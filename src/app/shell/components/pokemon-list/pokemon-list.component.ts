import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { concat, Subscription } from 'rxjs';
import { PokemonService } from 'src/app/shell/services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonViewComponent } from '../pokemon-view/pokemon-view.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  private pokemonListSubscription: Subscription = new Subscription();

  constructor(
    private pokemonService: PokemonService,
    private dialog: MatDialog
  ) { }

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
      this.getPokemons();
    }, error => console.log('Error Occurred:', error));
  }

  getPokemons(): void {
    this.pokemonService.getNext().subscribe(response => {
      this.pokemonService.nextPage = response.next;
      const details = response.results.map((pkm: any) => this.pokemonService.getPokemon(pkm.name));
      this.pokemonListSubscription = concat(...details).subscribe((response: any) => {
        this.pokemonService.pokemons.push(response);
      });
    }, error => console.log('Error Occurred:', error));
  }

  openPokemonDialog(pokemon: Pokemon) {
    this.dialog.open(PokemonViewComponent, {
      panelClass: 'pokemon-view-dialog',
      width: '100%',
      height: '100%',
      data: pokemon
    });
  }

  ngOnDestroy(): void {
    this.pokemonListSubscription.unsubscribe();
  }
}
