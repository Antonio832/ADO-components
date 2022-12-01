import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGrupoComponent } from './gestion-grupo.component';

describe('GestionGrupoComponent', () => {
  let component: GestionGrupoComponent;
  let fixture: ComponentFixture<GestionGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
