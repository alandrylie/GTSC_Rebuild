import { TestBed } from '@angular/core/testing';
import { AiAssistantService } from './ai-assistant.service';
import { AI } from '@angular/fire/ai';
import { of } from 'rxjs';
import { ClubInfoService } from './club-info.service';

vi.mock('@angular/fire/ai', () => ({
  AI: class {},
  ThinkingLevel: { MINIMAL: 'MINIMAL' },
  getGenerativeModel: vi.fn(() => ({
    startChat: vi.fn(() => ({ sendMessage: vi.fn() })),
  })),
}));

describe('AiAssistantService', () => {
  let service: AiAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AI, useValue: {} },
        {
          provide: ClubInfoService,
          useValue: { clubSchedule$: of({ sessions: [] }), clubCommittee$: of({ members: [] }) },
        },
      ],
    });
    service = TestBed.inject(AiAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
