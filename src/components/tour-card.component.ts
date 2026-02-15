import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

export interface Tour {
  id: number;
  title: string;
  location: string;
  price: number;
  imageSeed: string;
  duration: string;
  rating: number;
}

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
      <!-- Image Container -->
      <div class="relative h-64 overflow-hidden">
        <img 
          [ngSrc]="'https://picsum.photos/seed/' + tour().imageSeed + '/600/400'" 
          [alt]="tour().title"
          width="600"
          height="400"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div class="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-gray-100 shadow-sm">
          {{ tour().duration }}
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 flex flex-col flex-grow">
        <div class="flex justify-between items-start mb-2">
          <span class="text-primary font-semibold text-sm uppercase tracking-wider">{{ tour().location }}</span>
          <div class="flex items-center text-yellow-500">
            <span class="text-sm mr-1">★</span>
            <span class="text-sm font-bold">{{ tour().rating }}</span>
          </div>
        </div>

        <h3 class="font-serif text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
          {{ tour().title }}
        </h3>

        <div class="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div>
            <span class="text-gray-500 dark:text-gray-400 text-sm">From</span>
            <p class="text-xl font-bold text-gray-900 dark:text-white">\${{ tour().price }}</p>
          </div>
          <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary text-gray-800 dark:text-white rounded-lg transition-colors font-semibold text-sm">
            Details
          </button>
        </div>
      </div>
    </div>
  `
})
export class TourCardComponent {
  tour = input.required<Tour>();
}