import { TestBed } from '@angular/core/testing';
import { RotaService } from './rota.service';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

// Fake Firestore functions: no real database in unit tests
vi.mock('@angular/fire/firestore', () => ({
  Firestore: class {},
  collection: vi.fn(() => 'rotaRef'),
  query: vi.fn(),
  orderBy: vi.fn(),
  collectionData: vi.fn(() => of([])),
}));

describe('RotaService', () => {
  let service: RotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: {} },
        // Signed out, so the rota listener doesn't start
        { provide: AuthService, useValue: { user$: of(null) } },
      ],
    });
    service = TestBed.inject(RotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
