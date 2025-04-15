function fetchNBAGames() {
    fetch('http://localhost:3000/api/nba-games')
      .then(response => response.json())
      .then(data => {
        const gameList = document.getElementById('game-list');
        gameList.innerHTML = ''; // Clear the list
  
        data.data.forEach(game => {
          const gameDateUTC = new Date(game.datetime);
  
          // Convert to Eastern Time
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
          const formattedEST = estFormatter.format(gameDateUTC);
  
          const li = document.createElement('li');
          li.textContent = `${game.home_team.full_name} vs ${game.visitor_team.full_name} – ${formattedEST} (ET)`;
          gameList.appendChild(li);
        });
      })
      .catch(error => {
        console.error('NBA Games:', error);
      });
  }
  
  // Initial fetch
  fetchNBAGames();
  
  // Refresh every 30 seconds
  setInterval(fetchNBAGames, 30000);
  
  


