import { TestBed } from '@angular/core/testing';
import { ClubInfoService } from './club-info.service';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
vi.mock('@angular/fire/firestore', () => ({
  Firestore: class {},
  doc: vi.fn(),
  docData: vi.fn(() =>
    of({
      sessions: [],
    }),
  ),
}));
describe('ClubInfoService', () => {
  let service: ClubInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Firestore, useValue: {} }],
    });
    service = TestBed.inject(ClubInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
