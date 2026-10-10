import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../constants/app-routes.constants';

@Component({
  imports: [ReactiveFormsModule, MatButtonModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  errorMessage = signal('');
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  async onLogin() {
    if (this.loginForm.invalid) return;
    try {
      await this.authService.login(
        this.loginForm.getRawValue().email,
        this.loginForm.getRawValue().password,
      );
      this.loginForm.reset();
      this.router.navigate(['.', APP_ROUTES.home])
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Email or password is incorrect please try again.');
    }

  }
}
