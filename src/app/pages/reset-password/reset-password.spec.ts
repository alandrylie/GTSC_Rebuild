import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ResetPassword } from './reset-password';
import { AuthService } from '../../service/auth.service';

// What Firebase's validatePassword() gives back for an empty password
const fakeStatus = {
  isValid: false,
  meetsMinPasswordLength: false,
  containsUppercaseLetter: false,
  containsLowercaseLetter: false,
  containsNumericCharacter: false,
  containsNonAlphanumericCharacter: false,
  passwordPolicy: { customStrengthOptions: { minPasswordLength: 8 } },
};

describe('ResetPassword', () => {
  let component: ResetPassword;
  let fixture: ComponentFixture<ResetPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPassword],
      providers: [
        // Fake AuthService so the test never talks to Firebase
        {
          provide: AuthService,
          useValue: {
            checkResetLink: () => of({ email: 'member@example.com', error: '' }),
            checkPassword: vi.fn().mockResolvedValue(fakeStatus),
            confirmNewPassword: vi.fn(),
          },
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPassword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
