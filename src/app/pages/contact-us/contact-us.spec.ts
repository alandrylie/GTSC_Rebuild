import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ContactUs } from './contact-us';
import { ClubInfoService } from '../../service/club-info.service';

describe('ContactUs', () => {
  let component: ContactUs;
  let fixture: ComponentFixture<ContactUs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactUs],
      providers: [
        // Fake service: no Firestore in unit tests
        {
          provide: ClubInfoService,
          useValue: {
            contactSignal: signal({
              joinEmails: { rifles: [], pistols: [] },
              contacts: [{ role: 'Test role', email: 'test@example.com' }],
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
