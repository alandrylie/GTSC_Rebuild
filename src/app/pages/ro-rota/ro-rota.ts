import { Component, Signal, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RotaSession } from '../../model/rota-session';
import { RotaService } from '../../service/rota.service';

@Component({
  imports: [DatePipe, MatButton],
  selector: 'app-ro-rota',
  styleUrl: './ro-rota.css',
  templateUrl: './ro-rota.html',
})
export class RoRota {
  // Live rota from Firestore, ordered by date. null shows "Loading rota...".
  protected readonly roRotaService = inject(RotaService);
  protected readonly sessions: Signal<RotaSession[] | null> = this.roRotaService.rotaSignal;

  // Turns the stored discipline value into the words visitors see
  protected readonly disciplineLabels: Record<string, string> = {
    pistol: 'Pistols',
    rifle: 'Rifles',
    fac_rifles: 'FAC Rifles',
  };
}
