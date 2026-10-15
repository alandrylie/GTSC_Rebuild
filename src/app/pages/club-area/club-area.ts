import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../constants/app-routes.constants';
import { MatButton } from '@angular/material/button';
import { ClubAreaCard } from '../../components/club-area-card/club-area-card';
import { CLUB_AREA_LINKS } from '../../constants/club-area-links.constants';

@Component({
  imports: [MatButton, ClubAreaCard],
  selector: 'app-club-area',
  styleUrl: './club-area.css',
  templateUrl: './club-area.html',
})
export class ClubArea {
  private readonly auth = inject(AuthService);
  private readonly profile = inject(UsersService).profileSignal;
  protected readonly signedInUser = this.auth.userSignal;
  // Display name from users/{uid} (e.g. "Vice S."); falls back to the email if there's no profile
  protected readonly greetingName = computed(
    () => this.profile()?.displayName ?? this.signedInUser()?.email ?? '',
  );
  private readonly router = inject(Router);
  protected readonly links = CLUB_AREA_LINKS;

  async logOut() {
    await this.auth.logout();
    this.router.navigate(['/', APP_ROUTES.home]);
  }
}
