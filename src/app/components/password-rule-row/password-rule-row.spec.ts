import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordRuleRow } from './password-rule-row';

describe('PasswordRuleRow', () => {
  let component: PasswordRuleRow;
  let fixture: ComponentFixture<PasswordRuleRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordRuleRow],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordRuleRow);
    component = fixture.componentInstance;
    // The row needs a rule to show
    fixture.componentRef.setInput('rule', { label: 'A number', met: false });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
