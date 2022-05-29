import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellComponent } from './shell.component';
import { ShellRoutingModule } from './shell-routing.module';
import { MaterialModule } from './material.module';
import { 
  LandingComponent,
  PokemonListComponent,
  PokemonCardComponent,
  PokemonViewComponent
} from './components';
import { ChartsModule } from "@rinminase/ng-charts";

@NgModule({
  declarations: [
    ShellComponent,
    PokemonListComponent,
    PokemonViewComponent,
    PokemonCardComponent,
    LandingComponent,
  ],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MaterialModule,
    ChartsModule
  ],
  bootstrap: [ShellComponent]
})
export class ShellModule { }
