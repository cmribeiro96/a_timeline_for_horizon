import { timelineEvents } from '../data/timeline-data.js';
import {updateYearMarker} from './year-timeline.js';
import { groupEventsByYear } from './utils.js';

// Estado global como objeto para ser mutável
const timelineState = {
  currentIndex: 0,
  currentPosition: 0,
  eventWidth: 328,
  maxIndex: 0,
  maxPosition: 0,
};
// Funções para acessar e modificar o estado
function getCurrentIndex() { //exportado
  return timelineState.currentIndex;
}

function setCurrentIndex(value) { //não precisa ser exportado
  timelineState.currentIndex = value;
}

function getMaxIndex() { //exportado
  return timelineState.maxIndex;
}

function setMaxIndex(value) { // não precisa ser exportado
  timelineState.maxIndex = value;
}

function getCurrentPosition() { // não precisa ser exportado
  return timelineState.currentPosition;
}

function setCurrentPosition(value) { //não precisa ser exportado
  timelineState.currentPosition = value;
}

function getEventWidth() { //não precisa ser exportado
  return timelineState.eventWidth;
}

function setMaxPosition(value) { //não precisa ser exportado
  timelineState.maxPosition = value;
}

// Timeline initialization
function initializeTimeline() {
  const timeline = document.getElementById('timeline');
  const yearMarkers = document.getElementById('yearMarkers');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!timeline || !yearMarkers || !prevBtn || !nextBtn) {
    console.error('Required timeline elements not found');
    return;
  }

  // Create timeline content
  const eventsByYear = groupEventsByYear(timelineEvents);
  let totalElements = 0;

  Object.keys(eventsByYear).forEach((year) => {
    // Create year title
    const yearTitle = document.createElement('div');
    yearTitle.className = 'year-title';
    yearTitle.textContent = year;
    yearTitle.dataset.year = year;
    timeline.appendChild(yearTitle);
    totalElements++;

    // Add events for this year
    eventsByYear[year].forEach((event) => {
      const eventElement = createEventElement(event, year);
      eventElement.addEventListener('click', () => {
        const elementIndex = Array.from(timeline.children).indexOf(
          eventElement
        );
        if (typeof playSound === 'function') {
          playSound('select', 0.3);
        }
        navigateToIndex(elementIndex);
      });
      timeline.appendChild(eventElement);
      totalElements++;
    });
  });

  // Setup navigation usando as funções de estado
  setMaxIndex(timeline.children.length - 1);
  setMaxPosition(getMaxIndex() * getEventWidth());

  // Event listeners for navigation buttons
  prevBtn.addEventListener('click', () => {
    if (getCurrentIndex() > 0) navigateToIndex(getCurrentIndex() - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (getCurrentIndex() < getMaxIndex())
      navigateToIndex(getCurrentIndex() + 1);
  });

  // Initialize first state
  navigateToIndex(0);
  enhanceYearTitles();
}

function createEventElement(event, year) {
  const eventElement = document.createElement('div');
  eventElement.className = 'timeline-event';
  eventElement.dataset.year = year;

  eventElement.innerHTML = `
    <div class="event-marker"></div>
    <div class="event-content">
      <div class="event-header">
        <div class="event-date">
          <h3 class="event-title">${event.title}</h3>
          ${
            event.yearTitleCard
              ? `<span class="event-month">${event.yearTitleCard}</span>`
              : ''
          }
          ${
            event.month ? `<span class="event-month">${event.month}</span>` : ''
          }
          ${event.day ? `<span class="event-day">${event.day}</span>` : ''}
        </div>
      </div>
      <p class="event-description">${event.description}</p>
    </div>
  `;
  return eventElement;
}

function updateYearMarkerFromCurrentIndex() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  const currentElement = timeline.children[getCurrentIndex()];
  if (!currentElement) return;

  let year;
  year = currentElement.dataset.year || currentElement.textContent;

  if (year){ updateYearMarker(year) };
}

function updateButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.disabled = getCurrentIndex() === 0;
  if (nextBtn) nextBtn.disabled = getCurrentIndex() >= getMaxIndex();

  // Atualizar também as setas do carrossel
  if (typeof updateCarouselArrows === 'function') {
    updateCarouselArrows();
  }
}


function navigateToIndex(newIndex) {
  const currentMaxIndex = getMaxIndex();
  newIndex = Math.max(0, Math.min(newIndex, currentMaxIndex));
  setCurrentIndex(newIndex);

  const timeline = document.getElementById('timeline');
  const container = document.querySelector('.timeline-container');
  if (!timeline || !container) return;

  const containerWidth = container.offsetWidth;
  const timelineWidth = timeline.scrollWidth;

  let halfScreen = containerWidth / 2;
  let newPosition =
    halfScreen -
    getCurrentIndex() * getEventWidth() -
    getEventWidth() / 2 -
    getCurrentIndex() * 32;

  setCurrentPosition(newPosition);
  timeline.style.transform = `translateX(${getCurrentPosition()}px)`;

  if (typeof playSound === 'function') {
    playSound('navigate', 0.2);
  }

  updateActiveElement();
  updateButtons();
  updateYearMarkerFromCurrentIndex();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (typeof updateSpherePositions === 'function') {
        updateSpherePositions();
      }
    });
  });
}

function navigateToYear(targetYear) {
  const eventYearTitle = document.querySelector(
    `.year-title[data-year="${targetYear}"]`
  );
  if (eventYearTitle) {
    const elementIndex = Array.from(
      document.getElementById('timeline').children
    ).indexOf(eventYearTitle);
    navigateToIndex(elementIndex);
  }
  if (typeof playSound === 'function') {
    playSound('select', 0.25);
  }
}

function updateActiveElement() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  const currentElement = timeline.children[getCurrentIndex()];
  if (!currentElement) return;

  // Remove active classes
  document.querySelectorAll('.timeline-event, .year-title').forEach((el) => {
    el.classList.remove('active', 'active-year');
  });

  // Add appropriate active class
  if (currentElement.classList.contains('timeline-event')) {
    currentElement.classList.add('active');
    const year = currentElement.dataset.year;
    const yearTitle = document.querySelector(
      `.year-title[data-year="${year}"]`
    );
    if (yearTitle) yearTitle.classList.add('active-year');
  } else if (currentElement.classList.contains('year-title')) {
    currentElement.classList.add('active-year');
  }
}

function enhanceYearTitles() {
  document.querySelectorAll('.year-title').forEach((title) => {
    const decoration = document.createElement('div');
    decoration.className = 'year-decoration';
    title.appendChild(decoration);
  });
}

export {
  initializeTimeline,
  navigateToIndex,
  navigateToYear,
  getCurrentIndex,  
  getMaxIndex,  
  updateActiveElement,
  updateButtons,
};
