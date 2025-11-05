import {navigateToYear as navigateToYearEvent}  from './event-timeline.js';
import {timelineEvents} from '../data/timeline-data.js';
import {updateActivePeriod} from './historical-periods.js';

function updateYearMarker(year) {
  document.querySelectorAll('.year-marker').forEach((marker) => {
    const yearLabel = marker.querySelector('.year-label');
    marker.classList.toggle(
      'active',
      yearLabel && yearLabel.textContent === year
    );
  });

  // Update active historical period
  if (typeof updateActivePeriod === 'function') {
    updateActivePeriod(year);
  }
}
class YearTimelineScroll {
  constructor() {
    this.scrollContainer = document.getElementById('yearScrollContainer');
    this.yearMarkers = document.getElementById('yearMarkers');   
    // this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;

    this.init();
  }  

  init() {    

    // Create year markers and alter selected eventCard
  const uniqueYears = [
    ...new Set(timelineEvents.map((event) => event.year)),
  ].sort();  
  uniqueYears.forEach((year, index) => {
    const yearMarker = document.createElement('div');
    yearMarker.className = `year-marker ${index === 0 ? 'active' : ''}`;
    yearMarker.setAttribute('data-year', year); // Adicionar data attribute
    yearMarker.innerHTML = `
      <div class="year-dot"></div>
      <span class="year-label">${year}</span>
    `;
    yearMarker.addEventListener('click', () => navigateToYearEvent(year));
    yearMarkers.appendChild(yearMarker);
  });

    if (!this.scrollContainer || !this.yearMarkers) return;

    this.setupEventListeners();

    // Scroll para o ano atual após um breve delay
    setTimeout(() => {
      this.scrollToCurrentYear();
    }, 500);
  }
 

  overrideUpdateYearMarker() {
    // Guardar a função original
    const originalUpdateYearMarker = window.updateYearMarker;

    // Sobrescrever com scroll automático
    window.updateYearMarker = (year) => {
      // Chamar função original
      if (originalUpdateYearMarker) {
        originalUpdateYearMarker(year);
      }

      // Scroll para o ano
      this.scrollToYear(year);
    };
  }


  setupEventListeners() {
    // Scroll automático ao navegar na timeline
    if (typeof navigateToIndex === 'function') {
      // Sobrescrever a função updateYearMarker para incluir scroll
      this.overrideUpdateYearMarker();
    }

    // Drag para scroll em dispositivos com mouse
    // this.setupDragScroll();    
  }
 

  // setupDragScroll() {
  //   this.scrollContainer.addEventListener('mousedown', (e) => {
  //     this.isDragging = true;
  //     this.startX = e.pageX - this.scrollContainer.offsetLeft;
  //     this.scrollLeft = this.scrollContainer.scrollLeft;
  //     this.scrollContainer.style.cursor = 'grabbing';
  //     this.scrollContainer.style.userSelect = 'none';
  //   });

  //   document.addEventListener('mousemove', (e) => {
  //     if (!this.isDragging) return;
  //     e.preventDefault();
  //     const x = e.pageX - this.scrollContainer.offsetLeft;
  //     const walk = (x - this.startX) * 2;
  //     this.scrollContainer.scrollLeft = this.scrollLeft - walk;
  //   });

  //   document.addEventListener('mouseup', () => {
  //     this.isDragging = false;
  //     this.scrollContainer.style.cursor = 'grab';
  //     this.scrollContainer.style.userSelect = '';
  //   });

  //   this.scrollContainer.addEventListener('mouseleave', () => {
  //     this.isDragging = false;
  //     this.scrollContainer.style.cursor = 'grab';
  //     this.scrollContainer.style.userSelect = '';
  //   });
  // }

  scrollBy(amount) {
    this.scrollContainer.scrollBy({
      left: amount,
      behavior: 'smooth',
    });
  }

  scrollToYear(year) {
    const yearMarker = document.querySelector(`[data-year="${year}"]`);
    if (!yearMarker) return;

    const container = this.scrollContainer;
    const containerWidth = container.clientWidth;
    const markerLeft = yearMarker.offsetLeft;
    const markerWidth = yearMarker.offsetWidth;

    // Calcular posição para centralizar o marcador
    const targetScroll = markerLeft - containerWidth / 2 + markerWidth / 2;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  }

  scrollToCurrentYear() {
    const currentElement = document.querySelector('.year-marker.active');
    if (!currentElement) return;

    const yearLabel = currentElement.querySelector('.year-label');
    if (yearLabel) {
      this.scrollToYear(yearLabel.textContent);
    }
  }

  // Método para adicionar anos dinamicamente (se necessário no futuro)
  addYearMarker(year, isActive = false) {
    const yearMarker = document.createElement('div');
    yearMarker.className = `year-marker ${isActive ? 'active' : ''}`;
    yearMarker.innerHTML = `
      <div class="year-dot"></div>
      <span class="year-label">${year}</span>
    `;
    yearMarker.addEventListener('click', () => {
      if (typeof navigateToYear === 'function') {
        navigateToYear(year);
      }
    });

    this.yearMarkers.appendChild(yearMarker);
  }
}

export default YearTimelineScroll;
export { 
 updateYearMarker, 
};