// Attach one event listener to the container
document.getElementById('exercise-container').addEventListener('click', function(event) {
  if (event.target.classList.contains('add-to-routine-btn')) {
    const exerciseName = event.target.dataset.name;
    console.log("Add to routine:", exerciseName);
                                                                     // Add the exercise to your routine here
  }
});


const cardHTML = `
  <div class="exercise-card">
    <h3>Bridge</h3>
    <button class="add-to-routine-btn" data-name="Bridge">Add to Routine</button>
  </div>
`;
document.getElementById('exercise-container').insertAdjacentHTML('beforeend', cardHTML);
