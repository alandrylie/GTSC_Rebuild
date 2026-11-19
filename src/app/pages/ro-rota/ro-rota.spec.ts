import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { RoRota } from './ro-rota';
import { RotaService } from '../../service/rota.service';

describe('RoRota', () => {
  let component: RoRota;
  let fixture: ComponentFixture<RoRota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoRota],
      providers: [
        // Fake service: no Firestore in unit tests
        { provide: RotaService, useValue: { rotaSignal: signal([]) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoRota);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
