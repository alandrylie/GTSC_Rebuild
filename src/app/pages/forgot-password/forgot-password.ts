import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { APP_ROUTES } from '../../constants/app-routes.constants';

@Component({
  imports: [ReactiveFormsModule, MatButtonModule, RouterLink],
  selector: 'app-forgot-password',
  styleUrl: '../../shared/auth-card.css',
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  private readonly authService = inject(AuthService);
  protected readonly routes = APP_ROUTES;
  emailSent = signal(false);
  errorMessage = signal('');
  resetForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });

  async onSendReset() {
    if (this.resetForm.invalid) return;
    this.errorMessage.set('');
    try {
      await this.authService.resetPassword(this.resetForm.getRawValue().email);
      this.emailSent.set(true);
    } catch (error) {
      console.error(error);
      this.errorMessage.set('Something went wrong sending the email. Please try again later.');
    }
  }
}
