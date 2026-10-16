import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Disciplines } from './disciplines';
import { ClubInfoService } from '../../service/club-info.service';

describe('Disciplines', () => {
  let component: Disciplines;
  let fixture: ComponentFixture<Disciplines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Disciplines],
      providers: [
        // Fake service: no Firestore in unit tests
        {
          provide: ClubInfoService,
          useValue: { disciplineSignal: signal({ disciplines: [] }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Disciplines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
