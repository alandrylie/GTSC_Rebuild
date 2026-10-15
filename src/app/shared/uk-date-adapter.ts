import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

const UK_DATE = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

// Material's built-in adapter shows dates in UK order (with the en-GB locale) but reads
// typed dates the American way (03/04/2010 = 4 March). This one reads them as DD/MM/YYYY.
@Injectable()
export class UkDateAdapter extends NativeDateAdapter {
  override parse(value: unknown, parseFormat?: object): Date | null {
    if (typeof value !== 'string') return super.parse(value, parseFormat);
    if (value.trim() === '') return null;

    const match = UK_DATE.exec(value.trim());
    if (!match) return this.invalid();

    const [day, month, year] = match.slice(1).map(Number);
    const date = new Date(year, month - 1, day);
    // new Date(2010, 1, 31) quietly rolls over to 3 March, so check nothing rolled over
    if (date.getMonth() !== month - 1 || date.getDate() !== day) return this.invalid();
    return date;
  }
}
