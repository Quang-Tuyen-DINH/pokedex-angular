import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './shell/components/landing/landing.component';
import { PokemonListComponent } from './shell/components/pokemon-list/pokemon-list.component';
import { PokemonViewComponent } from './shell/components/pokemon-view/pokemon-view.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'list', component: PokemonListComponent },
  { path: 'pokemon/:name', component: PokemonViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
