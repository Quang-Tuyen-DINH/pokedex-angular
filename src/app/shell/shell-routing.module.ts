import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonViewComponent } from './components/pokemon-view/pokemon-view.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'list', component: PokemonListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShellRoutingModule { }
