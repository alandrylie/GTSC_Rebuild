import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionRow } from './session-row';

describe('SessionRow', () => {
  let component: SessionRow;
  let fixture: ComponentFixture<SessionRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionRow],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionRow);
    component = fixture.componentInstance;
    // The row needs a session to show (input.required)
    fixture.componentRef.setInput('session', {
      activity: 'Test session',
      day: 1,
      start: '19:00',
      end: '21:00',
      whoCanAttend: ['Members'],
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
