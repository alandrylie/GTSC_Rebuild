import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinUs } from './join-us';
import { of } from 'rxjs';
import { ClubInfoService } from '../../service/club-info.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { UkDateAdapter } from '../../shared/uk-date-adapter';

describe('JoinUs', () => {
  let component: JoinUs;
  let fixture: ComponentFixture<JoinUs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinUs],
      providers: [
        {
          provide: ClubInfoService,
          useValue: {
            clubContact$: of({
              joinEmails: { rifles: ['rifles@example.com'], pistols: ['pistols@example.com'] },
            }),
          },
        },
        { provide: DateAdapter, useClass: UkDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinUs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
