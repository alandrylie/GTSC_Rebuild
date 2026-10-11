import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { AuthService } from './service/auth.service';
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
      providers: [
        { provide: Firestore, useValue: {} },
        provideRouter([]),
        // Fake AuthService so the test never talks to Firebase
        { provide: AuthService, useValue: { logout: vi.fn(), userSignal: signal(null) } },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
