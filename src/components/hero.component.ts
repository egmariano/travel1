import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative h-[80vh] w-full overflow-hidden">
      <!-- Background Image -->
      <div 
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style="background-image: url('https://picsum.photos/seed/palawan/1920/1080');">
        <div class="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 text-white">
        <h1 class="font-serif text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg tracking-wide animate-fade-in-up">
          {{ title() }}
        </h1>
        <p class="font-sans text-xl md:text-2xl mb-8 max-w-2xl drop-shadow-md opacity-90">
          {{ subtitle() }}
        </p>
        <button 
          (click)="scrollToTours()"
          class="bg-primary hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-transparent hover:border-white/20">
          Explore Destinations
        </button>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fade-in-up 1s ease-out forwards;
    }
  `]
})
export class HeroComponent {
  title = input.required<string>();
  subtitle = input.required<string>();

  scrollToTours() {
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}