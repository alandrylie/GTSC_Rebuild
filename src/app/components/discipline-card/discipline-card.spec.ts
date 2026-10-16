import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisciplineCard } from './discipline-card';

describe('DisciplineCard', () => {
  let component: DisciplineCard;
  let fixture: ComponentFixture<DisciplineCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisciplineCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DisciplineCard);
    component = fixture.componentInstance;
    // The card needs a discipline to show (input.required)
    fixture.componentRef.setInput('discipline', {
      name: 'Test discipline',
      description: 'Test description',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
