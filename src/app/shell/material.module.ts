import { NgModule } from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [
    MatChipsModule,
    MatCardModule,
    MatGridListModule,
    ScrollingModule,
    MatDialogModule,
    MatButtonModule
  ],
})
export class MaterialModule { }