//vertical
export function repositionSpheresVerticallyWithCustomOffset({
    offsetForEvent = 0,
    offsetForYear = 0
  } = {}) {
    // const timelineLine = document.querySelector('.timeline-line');
    // if (!timelineLine) return;
  
    // const rect = timelineLine.getBoundingClientRect();
    // console.log({rectTop:rect.top, rectHeight:rect.height});
    // let centerY = rect.top + rect.height / 2;
  
    // const activeEvent = document.querySelector('.timeline-event.active');
    // const activeYear = document.querySelector('.year-title.active-year');
  
    // // Prioridade para evento ativo
    // if (activeEvent) {
    //   centerY += offsetForEvent;
    // } else if (activeYear) {
    //   centerY += offsetForYear;
    // }
  
    // const screenHeight = window.innerHeight;
    // const topVH = (centerY / screenHeight) * 100;
  
    // const spheres = document.querySelectorAll(
    //   '.sphere-3d-s1, .sphere-3d-s2, .sphere-3d-s3, .sphere-3d-s4, .sphere-3d-s5'
    // );
  
    // spheres.forEach(sphere => {
    //   sphere.style.top = `${topVH}vh`;
    // });

  const timeline = document.getElementById('timeline');

  // console.log({top:timeline.style.top, height:timeline.style.height});

  // const timelineCenterY = timeline.style.top + (timeline.style.height / 2);
  // console.log({timelineCenterY});

  const rect = timeline.getBoundingClientRect();

  // Posição TOP absoluta (leva em conta o scroll da página)
  // const topAbsoluto = rect.top + window.pageYOffset;
  // Ou de forma mais moderna:
  const topAbsoluto = rect.top + 18;

  console.log({topAbsoluto})
  console.log({
    top: rect.top,           // Distância do topo do elemento até o topo da viewport
    bottom: rect.bottom,     // Distância da base do elemento até o topo da viewport
    height: rect.height,     // Altura do elemento
    width: rect.width,       // Largura do elemento
    left: rect.left,         // Distância da esquerda do elemento até a esquerda da viewport
    right: rect.right        // Distância da direita do elemento até a esquerda da viewport
});

  const spheres = document.querySelectorAll(
      '.sphere-3d-s1, .sphere-3d-s2, .sphere-3d-s3, .sphere-3d-s4, .sphere-3d-s5'
    );

  spheres.forEach(sphere => {
      // console.log({sphereTop:sphere.style.top})
      sphere.style.top = `${topAbsoluto}px`;
    });

    

  }

//horizontal
export function getSphereCenterX(selector) {
  const element = document.querySelector(selector);
  if (!element) return null;
  const rect = element.getBoundingClientRect();
  return rect.left + rect.width / 2;
}

export function repositionSpheres() {
  const referenceSelector = '.sphere-3d-s1'; // Esfera central
  const referenceX = getSphereCenterX(referenceSelector);
  const screenWidth = window.innerWidth;

  if (!referenceX) return;

  const relativeDistances = {
    //distância horizontal fixa em pixels
    //Distância da esfera 2 em relação a esfera central
    '.sphere-3d-s2': 485,
    //Distância da esfera 3 em relação a esfera central
    '.sphere-3d-s3': -250,
    //Distância da esfera 4 em relação a esfera central
    '.sphere-3d-s4': 820,
    //Distância da esfera 5 em relação a esfera central
    '.sphere-3d-s5': -610,
  };

  Object.entries(relativeDistances).forEach(([selector, offsetPx]) => {
    const element = document.querySelector(selector);
    if (!element) return;

    const newX = referenceX + offsetPx;
    const newRightVW = ((screenWidth - newX) / screenWidth) * 100;

    element.style.right = `${newRightVW}vw`;
  });
}
