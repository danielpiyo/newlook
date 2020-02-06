import { TestBed } from '@angular/core/testing';

import { EquipementService } from './equipement.service';

describe('EquipementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquipementService = TestBed.get(EquipementService);
    expect(service).toBeTruthy();
  });
});
