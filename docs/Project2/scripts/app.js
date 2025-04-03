const API_KEY = "2b1f9436-1cba-449d-baca-af62713ec816"; // Replace with your actual API key

// Function to fetch today's NBA games
async function getGames() {
    let today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    let url = `https://www.balldontlie.io/api/v1/games?dates[]=${today}`; // API endpoint for today's games

    try {
        // Check if we have recently fetched data stored locally
        let cachedData = localStorage.getItem("gamesData");
        let lastFetch = localStorage.getItem("lastFetchTime");
        let now = Date.now();

        // If cached data is less than 1 minute old, use it instead of making a new API request
        if (cachedData && lastFetch && now - lastFetch < 60000) {
            console.log("Using cached data"); // Log message in console
            displayGames(JSON.parse(cachedData));
            return;
        }

        console.log("Fetching new data from API..."); // Log message in console

        // Fetch data from the API with API key included in headers
        let response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${API_KEY}` // Send API key in request header
            }
        });

        let data = await response.json();

        // Store the data in local storage to prevent excessive API calls
        localStorage.setItem("gamesData", JSON.stringify(data));
        localStorage.setItem("lastFetchTime", now);

        // Display the game data on the webpage
        displayGames(data);

        // Log the raw API response in the console for inspection
        console.log("API Response:", data);

    } catch (error) {
        console.error("Error fetching games:", error); // Log any errors to the console
    }
}

// Function to display game data in the HTML list
function displayGames(data) {
    let gameList = document.getElementById("game-list"); // Get the <ul> element
    gameList.innerHTML = ""; // Clear existing content

    // If there are no games today, display a message
    if (data.data.length === 0) {
        gameList.innerHTML = "<li>No games today.</li>";
        return;
    }

    // Loop through each game and create a list item for it
    data.data.forEach(game => {
        let gameItem = document.createElement("li");
        gameItem.textContent = `${game.home_team.full_name} vs. ${game.visitor_team.full_name} - Score: ${game.home_team_score} - ${game.visitor_team_score}`;
        gameList.appendChild(gameItem);
    });
}

// Call the function when the page loads
getGames();

// Refresh game data every 60 seconds (60000 milliseconds)
setInterval(getGames, 60000);
