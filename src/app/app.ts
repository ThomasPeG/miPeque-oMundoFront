import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { CommonModule } from '@angular/common';

Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit, AfterViewInit {

  isMenuOpen = false;

  @ViewChildren('animatedElement') animatedElements!: QueryList<ElementRef>;

  constructor(private el: ElementRef) {}

  /* ------------------------------
      NAVBAR MOBILE
  ------------------------------ */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  /* ------------------------------
      ANIMACIONES SCROLL
  ------------------------------ */
  ngOnInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.feature-item').forEach(item => observer.observe(item));
  }

  /* ------------------------------
      SWIPER CAROUSELS
  ------------------------------ */
  ngAfterViewInit() {
    new Swiper('.testimonial-carousel', {
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });

    new Swiper('.gallery-carousel', {
      slidesPerView: 'auto',
      spaceBetween: 25,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }
}
