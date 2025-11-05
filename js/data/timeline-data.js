// Timeline data
const timelineEvents = [
  {
    year: '2009',
    yearTitleCard: '2009',
    month: 'Unknown Month',
    day: 'Unknown Day',
    title: "Harriet Choi's birth",
    description:
      'Born around 2009, Harriet Choi later became a bioterrorist and member of the Naysay Doom, a death cult that existed in the 21st Century. This group engineered the "Doom Plague" viral cocktail, which was later released in  New York, London, Moscow, Tokyo, and Shanghai in the year 2039, killing millions of people. Following the attack in 2039, many countries outlawed burgeoning research on genetic testing.',
  },
  {
    year: '2013',
    yearTitleCard: '2013',
    month: 'December',
    day: '24th',
    title: "Ted Faro's birth",
    description:
      "The reponsible for humanity's doom in the future, Theodor 'Ted' Faro, was born on this date.",
  },
  {
    year: '2017',
    yearTitleCard: '2017',
    month: 'Unknown Month',
    day: 'Unknown Day',
    title: 'Law changes in the US',
    description:
      'The United States Interior Department decided to remove the grizzly bear from the list of endangered species.',
  },
  {
    year: '2020',
    yearTitleCard: '2020',
    month: 'Unknown Month',
    day: 'Unknown Day',
    title: "Snoring'20s",
    description:
      "Start of the 'Snoring '20s', a series of increasingly worsening climate crises leading up to the events called 'Die-Off' on the following decade.",
  },
  {
    year: '2020',
    yearTitleCard: '2020',
    month: 'March',
    day: '11th',
    title: "Elisabet's' birth",
    description:
      'Elisabet Sobeck was born on this date, in Carson City, Nevada, USA. She later became an American scientist, roboticist, and engineer. Brilliant and talented, with a deep altruistic concern for the world, Sobeck spent her entire career at the forefront of efforts to use technology to reduce and reverse the impact of global damage to the environment.',
  },
  {
    year: '2023',
    yearTitleCard: '2023',
    month: 'October',
    day: 'Unknown Day',
    title: 'Atbay Global Infrastructure founded',
    description:
      'Atbay Global Infrastructure was an Old Ones conglomerate headquartered in San Francisco, California. Founded by Kenzo Sasaki in October 2023, Atbay was known for its development of various technological products, from drones to infrastructure enhancements, such as their 2049 partnering with the Netherland-based company Cape Vertegaal in order to segment San Francisco into flood control zones, preventing catastrophic flooding.',
  },
];

// Processar todas as descrições
timelineEvents.forEach((event) => {
  event.description = event.description.replace(
    'Harriet Choi',
    '<a href="https://horizon.fandom.com/wiki/Harriet_Choi" target="_blank" rel="noopener noreferrer" class="wiki-link">Harriet Choi</a>'
  );
  event.description = event.description.replace(
    'Naysay Doom',
    '<a href="https://horizon.fandom.com/wiki/Naysay_Doom" target="_blank" rel="noopener noreferrer" class="wiki-link">Naysay Doom</a>'
  );
  event.description = event.description.replace(
    "Theodor 'Ted' Faro",
    "<a href='https://horizon.fandom.com/wiki/Ted_Faro' target='_blank' rel='noopener noreferrer' class='wiki-link'>Theodor 'Ted' Faro</a>"
  );
  event.description = event.description.replace(
    'Elisabet Sobeck',
    '<a href="https://horizon.fandom.com/wiki/Elisabet_Sobeck" target="_blank" rel="noopener noreferrer" class="wiki-link">Elisabet Sobeck</a>'
  );
  event.description = event.description.replace(
    'Atbay Global Infrastructure',
    '<a href="https://horizon.fandom.com/wiki/Atbay_Global_Infrastructure" target="_blank" rel="noopener noreferrer" class="wiki-link">Atbay Global Infrastructure</a>'
  );

  event.description = event.description.replace(
    'Kenzo Sasaki',
    '<a href="https://horizon.fandom.com/wiki/Kenzo_Sasaki" target="_blank" rel="noopener noreferrer" class="wiki-link">Kenzo Sasaki</a>'
  );
});

//Exportar tanto os dados quanto as funções de estado
export { timelineEvents };