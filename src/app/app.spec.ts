import { TestBed } from '@angular/core/testing';
import { App } from './app';
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

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: Firestore, useValue: {} }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
