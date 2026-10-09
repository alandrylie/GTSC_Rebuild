import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { of } from 'rxjs';

vi.mock('@angular/fire/auth', () => ({
  Auth: class {},
  user: vi.fn(() => of(null)),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Auth,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call signInWithEmailAndPassword with auth, email and password', async () => {
    const auth = TestBed.inject(Auth);

    await service.login('test@example.com', 'secret');

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'secret');
  });
});
