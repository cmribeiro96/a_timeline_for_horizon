import { getCurrentIndex, getMaxIndex } from '../data/timeline-data.js';
import { throttle } from './utils.js';

function setupKeyboardNavigation() {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if (getCurrentIndex() > 0) {
        if (typeof navigateToIndex === 'function') {
          navigateToIndex(getCurrentIndex() - 1);
        }
      }
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      if (getCurrentIndex() < getMaxIndex()) {
        if (typeof navigateToIndex === 'function') {
          navigateToIndex(getCurrentIndex() + 1);
        }
      }
    }
  });
}

function initializeCarouselArrows() {
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');

  console.log('Inicializando setas do carrossel:', {
    carouselPrev,
    carouselNext,
  });

  if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
      console.log('Seta anterior clicada, currentIndex:', getCurrentIndex());
      if (getCurrentIndex() > 0) {
        if (typeof navigateToIndex === 'function') {
          navigateToIndex(getCurrentIndex() - 1);
        }
      }
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener('click', () => {
      console.log('Seta próxima clicada, currentIndex:', getCurrentIndex(), 'maxIndex:', getMaxIndex());
      if (getCurrentIndex() < getMaxIndex()) {
        if (typeof navigateToIndex === 'function') {
          navigateToIndex(getCurrentIndex() + 1);
        }
      }
    });
  }
}

function updateCarouselArrows() {
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');

  if (carouselPrev) {
    carouselPrev.disabled = getCurrentIndex() === 0;
  }
  if (carouselNext) {
    carouselNext.disabled = getCurrentIndex() >= getMaxIndex();
  }
}

// Use throttle para eventos de redimensionamento
function setupResizeHandler() {
  window.addEventListener(
    'resize',
    throttle(() => {
      if (getCurrentIndex() >= 0 && typeof navigateToIndex === 'function') {
        navigateToIndex(getCurrentIndex());
      }
    }, 250)
  );
}

export { 
  setupKeyboardNavigation, 
  initializeCarouselArrows, 
  updateCarouselArrows, 
  setupResizeHandler 
};