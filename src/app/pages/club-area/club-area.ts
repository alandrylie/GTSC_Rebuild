import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../constants/app-routes.constants';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatButton],
  selector: 'app-club-area',
  styleUrl: './club-area.css',
  templateUrl: './club-area.html',
})
export class ClubArea {
  private readonly auth = inject(AuthService);
  protected readonly signedInUser = this.auth.userSignal;
  private readonly router = inject(Router);

  async signOut() {
    await this.auth.logout();
    this.router.navigate(['/', APP_ROUTES.home]);
  }
}
