import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navigation } from './navigation';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { AuthService } from '../../service/auth.service';

describe('Navigation', () => {
  let component: Navigation;
  let fixture: ComponentFixture<Navigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navigation],
      providers: [
        provideRouter([]),
        // Fake AuthService so the test never talks to Firebase
        { provide: AuthService, useValue: { logout: vi.fn(), userSignal: signal(null) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
