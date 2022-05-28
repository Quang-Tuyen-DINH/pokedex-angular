import { NgModule } from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  exports: [
    MatChipsModule,
    MatCardModule,
    MatGridListModule
  ],
})
export class MaterialModule { }