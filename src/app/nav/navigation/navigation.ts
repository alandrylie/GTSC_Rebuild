import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { APP_ROUTES } from '../../constants/app-routes.constants';
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';
import { ConfirmDialogData } from '../../model/confirm-dialog-data';

@Component({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
  ],
  selector: 'app-navigation',
  styleUrl: './navigation.css',
  templateUrl: './navigation.html',
})
export class Navigation {
  protected readonly routes = APP_ROUTES;
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  // Signed-in user (or null): decides whether the drawer shows Members Login or Club Area
  protected readonly signedInUser = this.auth.userSignal;

  // Asks first, so a mis-tap in the drawer doesn't log anyone out
  async logOut() {
    const data: ConfirmDialogData = {
      title: 'Log out?',
      message: 'You will need to log in again to reach the club area.',
      confirmText: 'Log out',
    };
    const dialogRef = this.dialog.open(ConfirmDialog, { data });
    const confirmed = await firstValueFrom(dialogRef.afterClosed());
    if (!confirmed) return;

    await this.auth.logout();
    this.router.navigate(['/', APP_ROUTES.home]);
  }
}
