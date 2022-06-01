import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './shell/components/landing/landing.component';
import { PokemonListComponent } from './shell/components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'list', component: PokemonListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
