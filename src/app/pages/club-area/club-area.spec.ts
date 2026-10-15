import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClubArea } from './club-area';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UsersService } from '../../service/users.service';
import { signal } from '@angular/core';

describe('ClubArea', () => {
  let component: ClubArea;
  let fixture: ComponentFixture<ClubArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubArea],
      providers: [
        // Fake AuthService so the test never talks to Firebase
        { provide: AuthService, useValue: { logout: vi.fn(), userSignal: signal(null) } },
        { provide: UsersService, useValue: { profileSignal: signal(null) } },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClubArea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
