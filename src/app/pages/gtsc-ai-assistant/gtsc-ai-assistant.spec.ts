import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GtscAiAssistant } from './gtsc-ai-assistant';
import { AiAssistantService } from '../../service/ai-assistant.service';

describe('GtscAiAssistant', () => {
  let component: GtscAiAssistant;
  let fixture: ComponentFixture<GtscAiAssistant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GtscAiAssistant],
      providers: [{ provide: AiAssistantService, useValue: { askGemini: vi.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(GtscAiAssistant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
