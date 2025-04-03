/*
const apiUrl = "https://picsum.photos/id/" + number + "/200/300";

async function fetchLiveScores() {
   try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.results) {
            console.log("Live Scores:", data.results);
            displayScores(data.results);
        } else {
            console.log("No live scores available.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
*/

// Add an event listener to the "Fetch Image" button
document.getElementById("fetchButton").addEventListener("click", function () {
    
    // Get the image ID entered by the user from the input field
    const imageId = document.getElementById("imageId").value;

    // Check if the user has entered an ID
    if (!imageId) { 
        alert("Please enter an Image ID"); // Show an alert if the input is empty
        return; // Stop the function from running further
    }

    // Construct the API URL using the entered image ID
    const imageUrl = `https://picsum.photos/id/${imageId}/700/700`;

    // Log the generated URL to the browser console for debugging
    //console.log("Fetching image from:", imageUrl); 

    // Update the "imageContainer" div with a new image element
    // The <img> tag is inserted dynamically with the fetched URL as the source
    document.getElementById("imageContainer").innerHTML = 
    `<img src="${imageUrl}" class="img-fluid rounded shadow" alt="Random Image">`;
});

// Function to generate a random number between 1 and 500
function getRandomNumber() {
    return Math.floor(Math.random() * 500) + 1;
}

// Add an event listener to the "Random Picture" button
document.getElementById("randomPicture").addEventListener("click", function () {
    // Generate a random image ID
    const randomImageNumber = getRandomNumber();

    // Construct the image URL using the random image ID
    const imageUrl = `https://picsum.photos/id/${randomImageNumber}/700/700`;

    // Update the "imageContainer" div with the random image
    document.getElementById("imageContainer").innerHTML = 
        `<img src="${imageUrl}" class="img-fluid rounded shadow" alt="Random Image">`;
});
