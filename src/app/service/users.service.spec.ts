import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

vi.mock('@angular/fire/firestore', () => ({
  Firestore: class {},
  doc: vi.fn(),
  docData: vi.fn(() => of(undefined)),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: {} },
        // Signed out, so the service never asks Firestore for a profile
        { provide: AuthService, useValue: { user$: of(null) } },
      ],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
