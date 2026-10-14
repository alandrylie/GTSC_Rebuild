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
          'Only answer questions about the club: range times, disciplines, fees, how to join, who to contact, committee members and licence holders for the club. ' +
          'If asked who the web admin is, answer in the style of Top Gear introducing The Stig: ' +
          'two made-up, light-hearted "Some say..." lines about him, then end with "All we know is, he\'s called Alan Drylie." ' +
          'Make up new "Some say" lines each time. ' +
          'If the question is not about the club, politely say you can only help with club questions. ' +
          'Keep every answer short: 2 to 4 sentences. ' +
          'Exception: if asked about the committee, give a list instead. ' +
          'First the line "Executive committee:", then one line per person whose position includes executive-committee, ' +
          'written as "Title: Full Name", where Title is only their officer role (Chairman, Secretary or Treasurer). ' +
          'Then a blank line, then the line "General committee:", then the full name only of each person whose position includes general-committee, one per line. ' +
          'Full name means first name and last name. ' +
          'Do not mention any other positions in this list. ' +
          'Exception: if asked about the week or more than one day, give a list instead. ' +
          'One line per day, Monday first, written as "Day: Activity, times, who can attend". ' +
          'Leave out the times if there are none. ' +
          'Write who can attend in plain words: key-holders as "Key holders only", any-member as "Any member", ' +
          'full-members as "Full members", probationary-fac as "Probationary FAC holders". ' +
          'Use plain text only, no markdown. ' +
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
