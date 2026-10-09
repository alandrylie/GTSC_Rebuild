import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RangeTimes } from './range-times';

describe('RangeTimes', () => {
  let component: RangeTimes;
  let fixture: ComponentFixture<RangeTimes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeTimes],
    }).compileComponents();

    fixture = TestBed.createComponent(RangeTimes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
