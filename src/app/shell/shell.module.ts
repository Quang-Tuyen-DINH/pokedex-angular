import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonViewComponent } from './components/pokemon-view/pokemon-view.component';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonViewComponent,
    PokemonCardComponent,
    HeaderComponent,
    LandingComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MaterialModule
  ]
})
export class ShellModule { }
