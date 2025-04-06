// Function to fetch live NBA box scores from your local proxy
async function getLiveScores() {
    const url = 'http://localhost:3000/api/live-scores';

    try {
        // Check if we have recently fetched data stored locally
        let cachedData = localStorage.getItem("liveScoresData");
        let lastFetch = localStorage.getItem("lastFetchTime");
        let now = Date.now();

        if (cachedData && lastFetch && now - lastFetch < 60000) {
            console.log("Using cached live data from localStorage");
            displayGames(JSON.parse(cachedData));
            return;
        }

        console.log("Fetching live data from proxy server...");
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        // Save to local storage
        localStorage.setItem("liveScoresData", JSON.stringify(data));
        localStorage.setItem("lastFetchTime", now);

        // Display on page
        displayGames(data);

        console.log("Live API Response:", data);
    } catch (error) {
        console.error("Error fetching live scores:", error);
        document.getElementById("game-list").innerHTML = `<li>Error fetching data.</li>`;
    }
}

// Function to display live scores
function displayGames(data) {
    const gameList = document.getElementById("game-list");
    gameList.innerHTML = "";

    const games = data.data || [];

    if (games.length === 0) {
        gameList.innerHTML = "<li>No live games right now.</li>";
        return;
    }

    games.forEach(game => {
        const item = document.createElement("li");
        item.textContent = `${game.game.home_team.full_name} vs. ${game.game.visitor_team.full_name} — Score: ${game.home_team_score} - ${game.visitor_team_score}`;
        gameList.appendChild(item);
    });
}

// Call it on page load
getLiveScores();

// Refresh every 60 seconds
setInterval(getLiveScores, 60000);

