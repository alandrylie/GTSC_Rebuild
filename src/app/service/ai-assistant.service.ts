import { inject, Service } from '@angular/core';
import { AI, ChatSession, getGenerativeModel, ThinkingLevel } from '@angular/fire/ai';
import { firstValueFrom } from 'rxjs';
import { ClubInfoService } from './club-info.service';

@Service()
export class AiAssistantService {
  private readonly aiService = inject(AI);
  private readonly clubInfo = inject(ClubInfoService);
  private chatSession?: ChatSession;
  async askGemini(question: string) {
    if (!question) return;
    const chat = await this.getChatSession();
    const questionAnswer = await chat.sendMessage(question);
    return questionAnswer.response.text();
  }
  private async getChatSession() {
    if (this.chatSession) return this.chatSession;
    const schedule = await firstValueFrom(this.clubInfo.clubSchedule$);
    const committee = await firstValueFrom(this.clubInfo.clubCommittee$);
    const aiModel = getGenerativeModel(
      this.aiService,
      {
        model: 'gemini-3.5-flash-lite',
        generationConfig: {
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.MINIMAL,
          },
        },
        systemInstruction:
          'You are the assistant for GTSC, a target shooting club in Fife, Scotland. ' +
          'Only answer questions about the club: range times, disciplines, fees how to join. ' +
          'If the question is not about the club, politely say you can only help with club questions. ' +
          'Keep every answer short: 2 to 3 sentences. ' +
          'Only use the club information below. If the answer is not there, say you do not know and suggest contacting the club. ' +
          'In the timetable, day 1 is Monday and day 7 is Sunday. ' +
          'Club timetable: ' +
          JSON.stringify(schedule) +
          '' +
          'Committee: ' +
          JSON.stringify(committee),
      },
      { timeout: 60_000 },
    );
    this.chatSession = aiModel.startChat();
    return this.chatSession;
  }
}
