import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluarEventosComponent } from './evaluar-eventos.component';

describe('EvaluarEventosComponent', () => {
  let component: EvaluarEventosComponent;
  let fixture: ComponentFixture<EvaluarEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluarEventosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluarEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
