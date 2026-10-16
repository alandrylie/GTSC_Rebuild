import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { RangeTimes } from './range-times';
import { ClubInfoService } from '../../service/club-info.service';

describe('RangeTimes', () => {
  let component: RangeTimes;
  let fixture: ComponentFixture<RangeTimes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeTimes],
      providers: [
        // Fake service: no Firestore in unit tests
        { provide: ClubInfoService, useValue: { scheduleSignal: signal({ sessions: [] }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RangeTimes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
