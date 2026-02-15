import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Toggle Button -->
    <button 
      (click)="toggleChat()"
      class="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-teal-600 text-white p-4 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      [class.rotate-90]="isOpen()"
      aria-label="Toggle AI Assistant"
    >
      @if (!isOpen()) {
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      }
    </button>

    <!-- Chat Window -->
    @if (isOpen()) {
      <div class="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden animate-slide-up h-[500px]">
        <!-- Header -->
        <div class="bg-primary p-4 text-white flex items-center gap-3">
          <div class="bg-white/20 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-lg">Bayani AI</h3>
            <p class="text-xs opacity-90">Your Philippines Travel Guide</p>
          </div>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900 scroll-smooth" #scrollContainer>
          @for (msg of messages(); track msg.id) {
            <div [class]="'flex ' + (msg.sender === 'user' ? 'justify-end' : 'justify-start')">
              <div 
                [class]="'max-w-[80%] rounded-2xl px-4 py-3 text-sm ' + 
                (msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-600 rounded-bl-none')"
                [innerHTML]="msg.text">
              </div>
            </div>
          }
          @if (isLoading()) {
            <div class="flex justify-start">
              <div class="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-600">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Input -->
        <div class="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <form (ngSubmit)="sendMessage()" class="flex gap-2">
            <input 
              type="text" 
              [(ngModel)]="userInput" 
              name="message"
              placeholder="Ask about tours, food, or tips..." 
              class="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              [disabled]="isLoading()"
            />
            <button 
              type="submit" 
              [disabled]="!userInput || isLoading()"
              class="bg-primary hover:bg-teal-600 disabled:opacity-50 text-white p-2 rounded-full transition-colors flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up {
      animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
  `]
})
export class AiAssistantComponent {
  private geminiService = inject(GeminiService);
  
  isOpen = signal(false);
  isLoading = signal(false);
  userInput = '';
  
  messages = signal<{id: number, text: string, sender: 'user' | 'bot'}[]>([
    { id: 1, text: "Mabuhay! I'm Bayani. Ask me anything about traveling in the Philippines!", sender: 'bot' }
  ]);

  toggleChat() {
    this.isOpen.update(v => !v);
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    const userMsg = this.userInput.trim();
    this.userInput = ''; // Clear input immediately

    // Add user message
    this.messages.update(msgs => [...msgs, {
      id: Date.now(),
      text: userMsg,
      sender: 'user'
    }]);

    this.isLoading.set(true);

    try {
      const response = await this.geminiService.getTravelAdvice(userMsg);
      
      this.messages.update(msgs => [...msgs, {
        id: Date.now() + 1,
        text: response,
        sender: 'bot'
      }]);
    } finally {
      this.isLoading.set(false);
    }
  }
}