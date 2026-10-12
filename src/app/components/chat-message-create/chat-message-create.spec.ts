import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatMessageCreate } from './chat-message-create';

describe('ChatMessageCreate', () => {
  let component: ChatMessageCreate;
  let fixture: ComponentFixture<ChatMessageCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessageCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
