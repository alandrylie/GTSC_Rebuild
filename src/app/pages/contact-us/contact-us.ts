import { Component, inject } from '@angular/core';
import { ClubInfoService } from '../../service/club-info.service';

@Component({
  imports: [],
  selector: 'app-contact-us',
  styleUrl: './contact-us.css',
  templateUrl: './contact-us.html',
})
export class ContactUs {
  protected readonly clubInfo = inject(ClubInfoService);
}
