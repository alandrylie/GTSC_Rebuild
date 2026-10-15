import { Component, computed, inject, signal } from '@angular/core';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { DatePipe } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { JoinTermsDialog } from '../../components/join-terms-dialog/join-terms-dialog';
import { JoinTermsDialogData } from '../../model/join-terms-dialog-data';
import { ClubInfoService } from '../../service/club-info.service';
import { MembershipApplication } from '../../model/membership-application';

const MAX_PEOPLE = 10;
// Mobile: 07... or +44 7..., spaces allowed (e.g. 07123 456789)
const MOBILE = /^(?:\+44\s?|0)7\d{3}\s?\d{3}\s?\d{3}$/;
const EMAIL_SUBJECT = 'Membership enquiry';
const POSTCODE = /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/;

@Component({
  imports: [
    ReactiveFormsModule,
    CdkCopyToClipboard,
    MatButton,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
  ],
  selector: 'app-join-us',
  styleUrl: './join-us.css',
  templateUrl: './join-us.html',
})
export class JoinUs {
  private readonly clubInfo = inject(ClubInfoService);
  private readonly dialog = inject(MatDialog);
  private readonly datePipe = new DatePipe('en-GB');

  protected readonly maxPeople = MAX_PEOPLE;
  protected readonly today = new Date(); // stops future birth dates
  protected readonly sent = signal(false);
  protected readonly errorMessage = signal('');
  // Shown on the thank-you card in case the email app didn't open
  protected readonly enquiryEmails = signal('');
  // Fallbacks for visitors with no email app: copy the text, or open webmail
  protected readonly emailBody = signal('');
  protected readonly copied = signal(false);
  protected readonly gmailLink = computed(
    () =>
      'https://mail.google.com/mail/?view=cm&fs=1' +
      `&to=${encodeURIComponent(this.enquiryEmails())}` +
      `&su=${encodeURIComponent(EMAIL_SUBJECT)}` +
      `&body=${encodeURIComponent(this.emailBody())}`,
  );
  protected readonly outlookLink = computed(
    () =>
      'https://outlook.live.com/mail/0/deeplink/compose' +
      `?to=${encodeURIComponent(this.enquiryEmails())}` +
      `&subject=${encodeURIComponent(EMAIL_SUBJECT)}` +
      `&body=${encodeURIComponent(this.emailBody())}`,
  );

  // A FormArray is a list of FormGroups: one per person in the household
  readonly applicationForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    mobile: new FormControl('', {
      validators: [Validators.required, Validators.pattern(MOBILE)],
      nonNullable: true,
    }),
    address: new FormGroup({
      line1: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      line2: new FormControl('', { nonNullable: true }),
      town: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      postcode: new FormControl('', {
        validators: [Validators.required, Validators.pattern(POSTCODE)],
        nonNullable: true,
      }),
    }),
    people: new FormArray([this.newPerson()]),
    // requiredTrue: the box must be ticked, not just touched
    notProhibited: new FormControl(false, {
      validators: [Validators.requiredTrue],
      nonNullable: true,
    }),
    canAttendInduction: new FormControl(false, {
      validators: [Validators.requiredTrue],
      nonNullable: true,
    }),
  });

  get people() {
    return this.applicationForm.controls.people;
  }

  private newPerson() {
    return new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      lastName: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      dateOfBirth: new FormControl<Date | null>(null, Validators.required),
      hasAwl: new FormControl<boolean | null>(null, Validators.required),
      hasFac: new FormControl<boolean | null>(null, Validators.required),
    });
  }

  protected addPerson() {
    if (this.people.length >= MAX_PEOPLE) return;
    this.people.push(this.newPerson());
  }

  protected removePerson(index: number) {
    if (this.people.length === 1) return; // always at least one person
    this.people.removeAt(index);
  }

  async submitApplication() {
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched(); // show every missing field in red
      return;
    }
    // Club terms pop-up: only send once they've ticked "I have read" and confirmed
    // Only juniors applying (no adults): they also agree to the parent/guardian rules
    const juniorsOnly = this.people.getRawValue().every((person) => this.isJunior(person));
    const dialogRef = this.dialog.open<JoinTermsDialog, JoinTermsDialogData, boolean>(
      JoinTermsDialog,
      { data: { juniorsOnly } },
    );
    const acknowledged = await firstValueFrom(dialogRef.afterClosed());
    if (!acknowledged) return;

    this.errorMessage.set('');
    try {
      // Club addresses come from Firestore (clubInfo/contact), so they can change without a redeploy
      const contact = await firstValueFrom(this.clubInfo.clubContact$);
      const recipients = contact?.enquiryEmails ?? [];
      if (recipients.length === 0) throw new Error('No enquiry email address set');

      const form = this.applicationForm.getRawValue();
      const enquiry: MembershipApplication = {
        ...form,
        termsAcknowledged: true,
        guardianAcknowledged: juniorsOnly,
        people: form.people.map((person) => ({
          ...person,
          dateOfBirth: person.dateOfBirth as Date, // form is valid, so never null here
          hasAwl: !!person.hasAwl,
          hasFac: !!person.hasFac,
        })),
      };
      // mailto: opens the visitor's own email app with everything filled in.
      // Nothing is stored on the website; the club just gets an email, like today.
      const bodyText = this.buildEmailBody(enquiry);
      const subject = encodeURIComponent(EMAIL_SUBJECT);
      const body = encodeURIComponent(bodyText);
      this.emailBody.set(bodyText);
      this.enquiryEmails.set(recipients.join(','));
      window.location.href = `mailto:${recipients.join(',')}?subject=${subject}&body=${body}`;
      this.sent.set(true);
    } catch {
      this.errorMessage.set('Sorry, your enquiry could not be prepared. Please try again later.');
    }
  }

  // Plain-text email the Vice-Secretary can read and reply to
  private buildEmailBody(enquiry: MembershipApplication) {
    const yesNo = (answer: boolean) => (answer ? 'Yes' : 'No');
    const { address } = enquiry;
    const people = enquiry.people.flatMap((person, i) => [
      `Person ${i + 1}: ${person.firstName} ${person.lastName}`,
      `  Date of birth: ${this.datePipe.transform(person.dateOfBirth, 'dd/MM/yyyy')}` +
        (this.isJunior(person) ? ' (junior)' : ''),
      `  Air Weapon Licence (AWL): ${yesNo(person.hasAwl)}`,
      `  Firearm Certificate (FAC): ${yesNo(person.hasFac)}`,
      '',
    ]);
    const lines = [
      'Membership enquiry from the GTSC website',
      '',
      `Email: ${enquiry.email}`,
      `Mobile: ${enquiry.mobile}`,
      '',
      'Address:',
      address.line1,
      ...(address.line2 ? [address.line2] : []),
      address.town,
      address.postcode.toUpperCase(),
      '',
      ...people,
      `Not prohibited from air weapons or firearms: ${yesNo(enquiry.notProhibited)}`,
      `Can attend an induction within 6 weeks: ${yesNo(enquiry.canAttendInduction)}`,
      `Club terms read and understood: ${yesNo(enquiry.termsAcknowledged)}`,
    ];
    if (enquiry.guardianAcknowledged) {
      lines.push('Juniors only: parent/guardian agreement accepted: Yes');
    }
    return lines.join('\n');
  }

  // Shown on each person card so the household can check who counts as a junior
  protected isJunior(person: { dateOfBirth: Date | null }) {
    const birth = person.dateOfBirth;
    if (!birth) return false;
    const eighteenth = new Date(birth.getFullYear() + 18, birth.getMonth(), birth.getDate());
    return eighteenth > new Date();
  }
}
