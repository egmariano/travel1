import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { HeroComponent } from './components/hero.component';
import { TourCardComponent, Tour } from './components/tour-card.component';
import { AiAssistantComponent } from './components/ai-assistant.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroComponent, TourCardComponent, AiAssistantComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  themeService = inject(ThemeService);

  // Mock Data
  tours: Tour[] = [
    {
      id: 1,
      title: 'El Nido Island Hopping',
      location: 'Palawan',
      price: 199,
      imageSeed: 'palawan',
      duration: '3 Days',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Chocolate Hills Adventure',
      location: 'Bohol',
      price: 150,
      imageSeed: 'bohol',
      duration: '2 Days',
      rating: 4.7
    },
    {
      id: 3,
      title: 'Siargao Surf Camp',
      location: 'Siargao',
      price: 350,
      imageSeed: 'siargao',
      duration: '5 Days',
      rating: 4.8
    },
    {
      id: 4,
      title: 'Boracay White Beach',
      location: 'Boracay',
      price: 400,
      imageSeed: 'boracay',
      duration: '4 Days',
      rating: 4.9
    },
    {
      id: 5,
      title: 'Kawasan Falls Canyoneering',
      location: 'Cebu',
      price: 120,
      imageSeed: 'cebu',
      duration: '1 Day',
      rating: 4.8
    },
    {
      id: 6,
      title: 'Vigan Heritage Tour',
      location: 'Ilocos',
      price: 180,
      imageSeed: 'vigan',
      duration: '2 Days',
      rating: 4.6
    }
  ];

  get currentThemeIcon() {
    return this.themeService.theme() === 'light' 
      ? 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z' // Moon
      : 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'; // Sun
  }
}