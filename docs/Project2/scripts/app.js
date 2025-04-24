// Utility to get today's date in YYYY-MM-DD (not used directly but handy if needed)
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Selectors
const nbaGameList = document.getElementById('nba-game-list');
const mlbGameList = document.getElementById('mlb-game-list');
const nbaButton = document.getElementById('nba-link');
const mlbButton = document.getElementById('mlb-link');

// Select the featured player container
const featuredPlayerContainer = document.getElementById('featured-players'); // NEW
const teamInfoContainer = document.getElementById('team-info');

// NBA team logos + featured players mapping
const nbaTeamAssets = {
  11: { logo: 'rocketsLogo.png', playerId: 458, playerName: 'Fred VanVleet', headshot: 'vanvleetHeadshot.jpg' },
  16: { logo: 'heatLogo.png', playerId: 4, playerName: 'Bam Adebayo', headshot: 'adebayoHeadshot.jpg' },
  7: { logo: 'mavericksLogo.png', playerId: 117, playerName: 'Anthony Davis', headshot: 'anthonydavisHeadshot.jpg' },
  10: { logo: 'warriorsLogo.png', playerId: 115, playerName: 'Steph Curry', headshot: 'curryHeadshot.jpg' },
  2: { logo: 'celticsLogo.png', playerId: 434, playerName: 'Jayson Tatum', headshot: 'tatumHeadshot.jpg' },
  20: { logo: 'knicksLogo.png', playerId: 73, playerName: 'Jalen Brunson', headshot: 'brunsonHeadshot.jpg' },
  6: { logo: 'cavaliersLogo.png', playerId: 322, playerName: 'Donovan Mitchell', headshot: 'donovanHeadshot.jpg' },
  9: { logo: 'pistonsLogo.png', playerId: 200, playerName: 'Tobias Harris', headshot: 'tobiasheadshot.jpg' },
  12: { logo: 'pacersLogo.png', playerId: 446, playerName: 'Pascal Siakam', headshot: 'pascalHeadshot.jpg' },
  17: { logo: 'bucksLogo.png', playerId: 265, playerName: 'Kyle Kuzma', headshot: 'kuzmaHeadshot.jpg' },
  1: { logo: 'hawksLogo.jpg', playerId: 490, playerName: 'Trae Young', headshot: 'traeHeadshot.jpg' },
  13: { logo: 'clippersLogo.png', playerId: 274, playerName: 'Kawhi Leonard', headshot: 'kawhiHeadshot.jpg' },
  22: { logo: 'magicLogo.png', playerId: 81, playerName: 'Kentavius Caldwell-Pope', headshot: 'kentaviusHeadshot.jpg' },
  14: { logo: 'lakersLogo.png', playerId: 27, playerName: 'Lebron James', headshot: 'lebronHeadshot.jpg' },
  15: { logo: 'grizzliesLogo.jpg', playerId: 666786, playerName: 'Ja Morant', headshot: 'jaHeadshot.jpg' },
  8: { logo: 'nuggetsLogo.jpg', playerId: 335, playerName: 'Jamal Murray', headshot: 'jamalHeadshot.jpg' },
  18: { logo: 'wolvesLogo.jpg', playerId: 3547238, playerName: 'Anthony Edwards', headshot: 'edwardsHeadshot.jpg' },
  21: { logo: 'thunderLogo.jpg', playerId: 89, playerName: 'Alex Caruso', headshot: 'carusoHeadshot.jpg' }
};

// Function to fetch and display featured player info
async function showFeaturedPlayer(playerId, teamId) {
  try {
    const response = await fetch(`http://localhost:3000/api/player/${playerId}`); // NEW
    const data = await response.json(); // NEW
    console.log('Player API response:', data);

    const asset = nbaTeamAssets[teamId];
    const player = data.data;

featuredPlayerContainer.innerHTML = `  
  <div class="card mt-3 p-3 shadow-sm">  
    <h4 class="text-center">${asset.playerName}</h4>  
    <img src="images/${asset.headshot}" alt="${asset.playerName} Headshot" class="mx-auto d-block mb-3" height="150">  
    <ul class="list-group">  
      <li class="list-group-item"><strong>Team:</strong> ${player.team.full_name}</li>  
      <li class="list-group-item"><strong>Position:</strong> ${player.position || 'N/A'}</li>  
      <li class="list-group-item"><strong>College:</strong> ${player.college || 'N/A'}</li>  
    </ul>  
  </div>  
`;

  } catch (err) {
    console.error('Error fetching featured player info:', err);  
  }
}

// Fetch and display team info
async function showTeamInfo(teamId) {
  try {
    const response = await fetch(`http://localhost:3000/api/teams/${teamId}`);
    const data = await response.json();

    const team = data.data || data; // Adjust based on actual response structure

    if (team) {
      const teamAsset = nbaTeamAssets[teamId];
      teamInfoContainer.innerHTML = `
        <h4>${team.full_name}</h4>
        <p><strong>City:</strong> ${team.city || 'N/A'}</p>
        <p><strong>Abbreviation:</strong> ${team.abbreviation || 'N/A'}</p>
        <p><strong>Conference:</strong> ${team.conference || 'N/A'}</p>
        <p><strong>Division:</strong> ${team.division || 'N/A'}</p>
      `;

      if (teamAsset && teamAsset.logo) {
        teamInfoContainer.innerHTML += `
          <img src="images/${teamAsset.logo}" alt="${team.full_name} Logo" class="team-logo">
        `;
      }

      teamInfoContainer.classList.remove('d-none');
    }
  } catch (err) {
    console.error('Error fetching team info:', err);
  }
}



//Hide team info
//function hideTeamInfo() {
//const teamInfoContainer = document.getElementById('team-info');
//teamInfoContainer.classList.add('d-none'); // Add 'd-none' class to hide the container
//}

// Function to populate the Teams section
function populateNBATeamsSection(games) {
  const teamsContainer = document.getElementById('teams-container');
  if (!teamsContainer) return;

  teamsContainer.innerHTML = '';
  const teamIdsShown = new Set();

  games.forEach(game => {
    const homeTeam = game.home_team;
    const visitorTeam = game.visitor_team;

    [homeTeam, visitorTeam].forEach(team => {
      if (!teamIdsShown.has(team.id) && nbaTeamAssets[team.id]) {
        teamIdsShown.add(team.id);

        const logo = nbaTeamAssets[team.id].logo;
        const logoImg = document.createElement('img');
        logoImg.src = `images/${logo}`;
        logoImg.alt = `${team.full_name} Logo`;
        logoImg.classList.add('team-logo', 'my-1');
        logoImg.style.cursor = 'pointer';
        logoImg.height = 75;

        logoImg.addEventListener('click', () => {
          const teamId = team.id; // Ensure team.id is getting the correct value
          console.log('Clicked team ID:', teamId); // Log to check the team ID
          
          const asset = nbaTeamAssets[teamId]; // Try fetching the asset by teamId
          console.log('Team asset:', asset); // Log the asset object to ensure it exists
        
          if (asset) {
            const { playerId } = asset; // Extract playerId if asset exists
            console.log('Player ID:', playerId); // Log the player ID
        
            // Show featured player
            showFeaturedPlayer(playerId, teamId);
        
            // Show team info
            showTeamInfo(teamId);
          } else {
            console.log('No asset found for team ID:', teamId); // Log if no asset is found
          }
        });                
                

        teamsContainer.appendChild(logoImg);
      }
    });
  });
}

async function fetchGames(url, league) {
  try {
    if (league === 'NBA') {
      nbaGameList.innerHTML = `<li>Loading NBA games...</li>`;
      nbaGameList.classList.remove('d-none');
      mlbGameList.classList.add('d-none');
    } else if (league === 'MLB') {
      mlbGameList.innerHTML = `<li>Loading MLB games...</li>`;
      mlbGameList.classList.remove('d-none');
      nbaGameList.classList.add('d-none');
    }

    const response = await fetch(url);
    const data = await response.json();
    displayGames(data.data, league);

    if (league === 'NBA') {
      populateNBATeamsSection(data.data);
    } else {
      document.getElementById('teams-container').innerHTML = '';
    }
  } catch (err) {
    if (league === 'NBA') {
      nbaGameList.innerHTML = `<li>Error loading NBA games.</li>`;
    } else {
      mlbGameList.innerHTML = `<li>Error loading MLB games.</li>`;
    }
    console.error(`${league} Games Error:`, err);
  }
}

function displayGames(data, league) {
  const gameList = league === 'NBA' ? nbaGameList : mlbGameList;
  gameList.innerHTML = '';

  if (!data || data.length === 0) {
    gameList.innerHTML = `<li>No ${league} games today.</li>`;
    return;
  }

  data.forEach(game => {
    let gameTimeDisplay = 'TBD';
    let homeTeamName = '';
    let awayTeamName = '';

    if (league === 'NBA') {
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
  clearInterval(refreshInterval);
  fetchGames('http://localhost:3000/api/nba-games', 'NBA');
  refreshInterval = setInterval(() => fetchGames('http://localhost:3000/api/nba-games', 'NBA'), 30000);
});

mlbButton.addEventListener('click', () => {
  clearInterval(refreshInterval);
  fetchGames('http://localhost:3000/api/mlb-games', 'MLB');
});

// Initial NBA fetch on load
window.addEventListener('DOMContentLoaded', () => {
  fetchGames('http://localhost:3000/api/nba-games', 'NBA');
  refreshInterval = setInterval(() => fetchGames('http://localhost:3000/api/nba-games', 'NBA'), 30000);
});

// Store refresh interval ID globally
let refreshInterval;
















