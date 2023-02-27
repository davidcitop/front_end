import { TestBed } from '@angular/core/testing';

import { RolsistemaService } from './rolsistema.service';

describe('RolsistemaService', () => {
  let service: RolsistemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolsistemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
