import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormhorarioComponent } from './formhorario.component';

describe('FormhorarioComponent', () => {
  let component: FormhorarioComponent;
  let fixture: ComponentFixture<FormhorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormhorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormhorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
