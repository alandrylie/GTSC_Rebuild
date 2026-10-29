import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { APP_ROUTES } from '../../constants/app-routes.constants';
import { PasswordRuleRow } from '../../components/password-rule-row/password-rule-row';
import { toPasswordRules } from '../../helpers/to-password-rules';
import { resetErrorMessage } from '../../helpers/reset-error-message';

// Our own reset page, opened from the reset email (set as the action URL in the console)
@Component({
  imports: [ReactiveFormsModule, MatButtonModule, RouterLink, PasswordRuleRow],
  selector: 'app-reset-password',
  styleUrls: ['../../shared/auth-card.css', './reset-password.css'],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  private readonly authService = inject(AuthService);
  private readonly code = inject(ActivatedRoute).snapshot.queryParamMap.get('oobCode') ?? '';
  protected readonly routes = APP_ROUTES;
  passwordChanged = signal(false);
  errorMessage = signal('');
  resetForm = new FormGroup({
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  // null = still checking the link
  linkCheck = toSignal(this.authService.checkResetLink(this.code), { initialValue: null });
  // Live checklist: re-checked against the console's policy on every key press
  rules = toSignal(
    this.resetForm.controls.password.valueChanges.pipe(
      startWith(''),
      switchMap((password) => this.authService.checkPassword(password)),
      map(toPasswordRules),
    ),
    { initialValue: [] },
  );
  allRulesMet = computed(() => this.rules().length > 0 && this.rules().every((rule) => rule.met));
  view = computed(() => {
    const link = this.linkCheck();
    if (!link) return 'loading';
    if (link.error) return 'badLink';
    if (this.passwordChanged()) return 'done';
    return 'form';
  });

  async onSetPassword() {
    if (!this.allRulesMet()) return;
    this.errorMessage.set('');
    try {
      await this.authService.confirmNewPassword(this.code, this.resetForm.getRawValue().password);
      this.passwordChanged.set(true);
    } catch (error) {
      console.error(error);
      this.errorMessage.set(resetErrorMessage(error));
    }
  }
}
