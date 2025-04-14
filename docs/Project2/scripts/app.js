async function getLiveScores() {
    try {
        const response = await fetch('http://localhost:3000/api/live-scores');
        const data = await response.json();
        console.log("API Response:", data);

        if (!data.data || data.data.length === 0) {
            displayScores([{ message: 'No live games right now.' }]);
        } else {
            displayScores(data.data);
        }
    } catch (error) {
        console.error('Error fetching live scores:', error);
    }
}

function displayScores(games) {
    const list = document.getElementById("game-list");
    list.innerHTML = "";

    games.forEach(game => {
        const item = document.createElement("li");
        if (game.message) {
            item.textContent = game.message;
        } else {
            item.textContent = `${game.home_team.full_name} vs ${game.visitor_team.full_name} — Score: ${game.home_team_score} - ${game.visitor_team_score}`;
        }
        list.appendChild(item);
    });
}

getLiveScores();
setInterval(getLiveScores, 60000);
