import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PokemonViewComponent } from './pokemon-view.component';

describe('PokemonViewComponent', () => {
  let component: PokemonViewComponent;
  let fixture: ComponentFixture<PokemonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonViewComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: HttpClient, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
