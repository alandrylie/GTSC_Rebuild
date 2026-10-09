import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
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
      providers: [{ provide: Firestore, useValue: {} }, provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
