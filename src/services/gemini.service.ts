import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] || '' });
  }

  async getTravelAdvice(query: string): Promise<string> {
    if (!process.env['API_KEY']) {
      return "Please configure your API Key to use the AI assistant.";
    }

    try {
      const model = 'gemini-2.5-flash';
      const response = await this.ai.models.generateContent({
        model: model,
        contents: query,
        config: {
          systemInstruction: "You are an enthusiastic and knowledgeable travel guide for the Philippines. " +
            "Your name is 'Bayani'. You recommend specific destinations (Palawan, Boracay, Siargao, Cebu, etc.), " +
            "local Filipino dishes, and cultural tips. Keep responses concise, warm, and inviting. " +
            "Format your response with simple HTML tags like <b> for emphasis and <br> for line breaks if needed, but mostly plain text is fine.",
          maxOutputTokens: 300,
        }
      });
      return response.text || "I couldn't generate a response at the moment. Try again!";
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "Sorry, I'm having trouble connecting to the travel network right now.";
    }
  }
}