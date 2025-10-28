// Importações de módulos
import { getCurrentIndex, getMaxIndex } from './data/timeline-data.js';
import {
  initializeTimeline,
  navigateToIndex,
  navigateToYear,
  updateYearMarker,
} from './modules/timeline-core.js';
import {
  initializeHistoricalPeriods,
  updateActivePeriod,
} from './modules/historical-periods.js';
import {
  setupKeyboardNavigation,
  initializeCarouselArrows,
  updateCarouselArrows,
  setupResizeHandler,
} from './modules/navigation.js';
import {
  initializeSoundSystem,
  playSound,
  harmonicMusic,
  initHarmonicMusicControls,
  initHarmonicMusic,
  initCardSounds,
} from './modules/sound-system.js';
import { initializePopup, /*addDebugButtons*/ } from './modules/popup.js';
import YearTimelineScroll from './modules/year-timeline-scroll.js'; // NOVA IMPORTACAO

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded - initializing application');
  initializeApplication();
});

// Variável global para o scroll da year timeline
let yearTimelineScroll;

function initializeApplication() {
  // Inicializa o timeline básico
  initializeTimeline();

  // Inicializa períodos históricos
  initializeHistoricalPeriods();

  // INICIALIZA O SCROLL DA YEAR TIMELINE - DEPOIS do timeline estar pronto
  yearTimelineScroll = new YearTimelineScroll();

  // navegação por teclado
  setupKeyboardNavigation();

  // Inicializa as setas do carrossel
  initializeCarouselArrows();

  // Inicializa sistema de sons
  initializeSoundSystem();

  // Configurar handler de redimensionamento
  setupResizeHandler();

  // Inicializar sons de cards
  initCardSounds();

  // Por último o popup
  initializePopup();

  // Inicializar controles de música
  initHarmonicMusicControls();
  initHarmonicMusic();

  // Apenas para desenvolvimento
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    addDebugButtons();
  }
}

// Make functions globally available if needed
window.navigateToIndex = navigateToIndex;
window.navigateToYear = navigateToYear;
window.playSound = playSound;
window.harmonicMusic = harmonicMusic;
window.updateActivePeriod = updateActivePeriod;
window.updateCarouselArrows = updateCarouselArrows;
window.updateYearMarker = updateYearMarker; // Exportar para o scroll system

export {
  navigateToIndex,
  navigateToYear,
  playSound,
  updateActivePeriod,
  updateCarouselArrows,
  updateYearMarker,
  getCurrentIndex,
  getMaxIndex,
};
