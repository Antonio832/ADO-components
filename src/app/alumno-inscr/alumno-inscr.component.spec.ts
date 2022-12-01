import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoInscrComponent } from './alumno-inscr.component';

describe('AlumnoInscrComponent', () => {
  let component: AlumnoInscrComponent;
  let fixture: ComponentFixture<AlumnoInscrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoInscrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoInscrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
