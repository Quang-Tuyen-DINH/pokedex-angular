import { Directive, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { PokemonService } from 'src/app/shell/services/pokemon.service';

@Directive({
  selector: '[scrollTracker]'
})
export class ScrollTrackerDirective {
  constructor(private pokemonService: PokemonService) {}

  @HostListener('scroll', ['$event'])
    onScroll(e: any): void {
    // this.loadMorePokemons();
  }

  loadMorePokemons() {
  }
}