// Utility to get today's date in YYYY-MM-DD (not used directly but handy if needed)
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Selectors
const gameList = document.getElementById('game-list');
const nbaButton = document.getElementById('nba-link');
const mlbButton = document.getElementById('mlb-link');

// Fetch and display games for either NBA or MLB
async function fetchGames(url, league) {
  try {
    gameList.innerHTML = `<li>Loading ${league} games...</li>`;
    const response = await fetch(url);
    const data = await response.json();
    displayGames(data.data, league);
  } catch (err) {
    gameList.innerHTML = `<li>Error loading ${league} games.</li>`;
    console.error(`${league} Games Error:`, err);
  }
}

// Display function with ET formatting
function displayGames(data, league) {
  const gameList = document.getElementById('game-list');
  gameList.innerHTML = ''; // Clear the list

  if (!data || data.length === 0) {
    gameList.innerHTML = `<li>No ${league} games today.</li>`;
    return;
  }

  data.forEach(game => {
    let gameTimeDisplay = 'TBD';
    let homeTeamName = '';
    let awayTeamName = '';

    if (league === 'NBA') {
      // NBA specific data
      homeTeamName = game.home_team.full_name;
      awayTeamName = game.visitor_team.full_name;
      if (game.datetime) {
        try {
          const gameDateUTC = new Date(game.datetime);
          const options = {
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          };
          const estFormatter = new Intl.DateTimeFormat('en-US', options);
          gameTimeDisplay = estFormatter.format(gameDateUTC);
        } catch (e) {
          console.warn('Invalid datetime for game:', game, e);
        }
      }
    } else if (league === 'MLB') {
      // MLB specific data
      homeTeamName = game.home_team.display_name || game.home_team.name;
      awayTeamName = game.away_team.display_name || game.away_team.name;
      if (game.date) {
        try {
          const gameDateUTC = new Date(game.date);
          const options = {
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          };
          const estFormatter = new Intl.DateTimeFormat('en-US', options);
          gameTimeDisplay = estFormatter.format(gameDateUTC);
        } catch (e) {
          console.warn('Invalid datetime for game:', game, e);
        }
      }
    }

    const li = document.createElement('li');
    li.textContent = `${homeTeamName} vs ${awayTeamName} – ${gameTimeDisplay} (ET)`;
    gameList.appendChild(li);
  });
}

// Event Listeners for league buttons
nbaButton.addEventListener('click', () => {
  clearInterval(refreshInterval); // Clear any existing auto-refresh
  fetchGames('http://localhost:3000/api/nba-games', 'NBA');
  refreshInterval = setInterval(() => fetchGames('http://localhost:3000/api/nba-games', 'NBA'), 30000);
});

mlbButton.addEventListener('click', () => {
  clearInterval(refreshInterval); // Clear auto-refresh when switching
  fetchGames('http://localhost:3000/api/mlb-games', 'MLB');
});

// Initial NBA fetch on load
window.addEventListener('DOMContentLoaded', () => {
  fetchGames('http://localhost:3000/api/nba-games', 'NBA');
  refreshInterval = setInterval(() => fetchGames('http://localhost:3000/api/nba-games', 'NBA'), 30000);
});

// Store refresh interval ID globally so we can clear it on MLB clicks
let refreshInterval;

  


