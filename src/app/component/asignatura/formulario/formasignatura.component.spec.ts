import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormasignaturaComponent } from './formasignatura.component';

describe('FormasignaturaComponent', () => {
  let component: FormasignaturaComponent;
  let fixture: ComponentFixture<FormasignaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormasignaturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormasignaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
