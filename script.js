/**************************************
 * script.js
 **************************************/
async function loadMatchups() {
    const response = await fetch('matchups.json');
    return await response.json();
  }
  
  function createList(items = [], cssClass, itemFormatter = null) {
    const ul = document.createElement('ul');
    ul.classList.add(cssClass);
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = itemFormatter ? itemFormatter(item) : item;
      ul.appendChild(li);
    });
    return ul;
  }
  
  // Format a datacron object { level, bonus } into a string
  function formatDatacron(datacron) {
    return `Level ${datacron.level} - ${datacron.bonus}`;
  }
  
  // Build a single "counter" sub-widget
  function buildCounterSection(counter) {
    const counterDiv = document.createElement('div');
    counterDiv.classList.add('counter-section');
  
    // Title row: "Counter Team" + expected banners
    const titleRow = document.createElement('div');
    titleRow.classList.add('counter-section-title');
    titleRow.textContent = `Counter Team (Expected Banners: ${counter.expectedBanners})`;
    counterDiv.appendChild(titleRow);
  
    // Composition
    const compTitle = document.createElement('div');
    compTitle.classList.add('section-subtitle');
    compTitle.textContent = 'Composition:';
    counterDiv.appendChild(compTitle);
  
    const compList = createList(counter.counterTeamComposition, 'composition-list');
    counterDiv.appendChild(compList);
  
    // Required Omicrons
    const omicronTitle = document.createElement('div');
    omicronTitle.classList.add('section-subtitle');
    omicronTitle.textContent = 'Required Omicrons:';
    counterDiv.appendChild(omicronTitle);
  
    const omicronList = createList(counter.counterTeamRequiredOmicrons, 'omicron-list');
    counterDiv.appendChild(omicronList);
  
    // Required Datacrons
    const datacronTitle = document.createElement('div');
    datacronTitle.classList.add('section-subtitle');
    datacronTitle.textContent = 'Required Datacrons:';
    counterDiv.appendChild(datacronTitle);
  
    const datacronList = createList(counter.counterTeamRequiredDatacrons, 'datacron-list', formatDatacron);
    counterDiv.appendChild(datacronList);
  
    return counterDiv;
  }
  
  // Build the main matchup card (one per defending team)
  function buildMatchupCard(matchup) {
    const card = document.createElement('div');
    card.classList.add('matchup-card');
  
    // Card Title (Defending Team)
    const defendingTitle = document.createElement('h2');
    defendingTitle.textContent = `${matchup.defendingTeamName} (ID: ${matchup.defendingTeamId})`;
    card.appendChild(defendingTitle);
  
    // Defending Team Section
    const defendingSection = document.createElement('div');
    defendingSection.classList.add('matchup-section');
  
    // Composition
    const defCompTitle = document.createElement('div');
    defCompTitle.classList.add('section-title');
    defCompTitle.textContent = 'Defending Team Composition:';
    defendingSection.appendChild(defCompTitle);
  
    const defCompList = createList(matchup.defendingTeamComposition, 'composition-list');
    defendingSection.appendChild(defCompList);
  
    // Omicrons
    const defOmicronsTitle = document.createElement('div');
    defOmicronsTitle.classList.add('section-title');
    defOmicronsTitle.textContent = 'Defending Team Omicrons:';
    defendingSection.appendChild(defOmicronsTitle);
  
    const defOmicronsList = createList(matchup.defendingTeamOmicrons, 'omicron-list');
    defendingSection.appendChild(defOmicronsList);
  
    // Datacrons
    const defDatacronsTitle = document.createElement('div');
    defDatacronsTitle.classList.add('section-title');
    defDatacronsTitle.textContent = 'Defending Team Datacrons:';
    defendingSection.appendChild(defDatacronsTitle);
  
    const defDatacronsList = createList(matchup.defendingTeamDatacrons, 'datacron-list', formatDatacron);
    defendingSection.appendChild(defDatacronsList);
  
    card.appendChild(defendingSection);
  
    // COUNTERS SECTION
    const countersSection = document.createElement('div');
    countersSection.classList.add('counters-section');
  
    // Sort the counters by expectedBanners (descending)
    const sortedCounters = (matchup.counters || []).sort(
      (a, b) => b.expectedBanners - a.expectedBanners
    );
  
    sortedCounters.forEach(counter => {
      const counterWidget = buildCounterSection(counter);
      countersSection.appendChild(counterWidget);
    });
  
    card.appendChild(countersSection);
  
    return card;
  }
  
  (async function main() {
    const matchupsData = await loadMatchups();
    const container = document.getElementById('matchups-container');
  
    matchupsData.forEach(matchup => {
      const card = buildMatchupCard(matchup);
      container.appendChild(card);
    });
  })();
  