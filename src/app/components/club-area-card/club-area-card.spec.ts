import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ClubAreaCard } from './club-area-card';

describe('ClubAreaCard', () => {
  let component: ClubAreaCard;
  let fixture: ComponentFixture<ClubAreaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubAreaCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ClubAreaCard);
    component = fixture.componentInstance;
    // The card needs a link to show (input.required)
    fixture.componentRef.setInput('link', {
      title: 'Test',
      description: 'Test card',
      icon: 'forum',
      route: 'test',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
