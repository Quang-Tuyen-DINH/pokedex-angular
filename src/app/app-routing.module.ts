import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonViewComponent } from './components/pokemon-view/pokemon-view.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: '**', component: PokemonListComponent },
  { path: 'pokemon/:name', component: PokemonViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
