import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PasswordRule } from '../../model/password-rule';

@Component({
  imports: [MatIconModule],
  selector: 'app-password-rule-row',
  // The component's own tag is the list item, so the <ul> on the page stays valid
  host: { role: 'listitem', '[class.met]': 'rule().met' },
  styleUrl: './password-rule-row.css',
  templateUrl: './password-rule-row.html',
})
export class PasswordRuleRow {
  readonly rule = input.required<PasswordRule>();
}
