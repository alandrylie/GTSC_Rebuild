import { TestBed } from '@angular/core/testing';
import { UkDateAdapter } from './uk-date-adapter';

describe('UkDateAdapter', () => {
  let adapter: UkDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UkDateAdapter] });
    adapter = TestBed.inject(UkDateAdapter);
  });

  it('should create an instance', () => {
    expect(adapter).toBeTruthy();
  });
});
