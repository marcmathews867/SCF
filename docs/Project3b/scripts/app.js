// NEW: Initialize Dexie database for persistent storage
const db = new Dexie('ExerciseAppDatabase');
db.version(1).stores({
  exercises: '++id, exerciseName, bodyParts, resistanceOption, repsOption, description, image, createdAt',
  routines: '++id, exercises, createdAt'
});

// NEW: Load exercises from database when page loads
document.addEventListener('DOMContentLoaded', async function() {
  try {
    console.log('Loading exercises from database...');
    await loadExercisesFromDB();
    await loadRoutinesFromDB(); // NEW: Load saved routines on startup
    console.log('Initial load complete');
  } catch (error) {
    console.error('Error during initial load:', error);
  }
});

// UNCHANGED: Event delegation for "Add to Routine" buttons
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-routine-btn')) {
    // Get the closest card
    const card = e.target.closest('.card');

    // Get the exercise name from the bold element
    const nameElement = card.querySelector('.fw-bold');
    const exerciseName = nameElement ? nameElement.textContent.trim() : '';

    if (!exerciseName) return;

    // Create and append the list item
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = exerciseName;

    document.getElementById('routineList').appendChild(li);
  }
});

// UNCHANGED: Image selection functionality
document.querySelectorAll('.selectable-image').forEach(img => {
  img.addEventListener('click', () => {
    document.querySelectorAll('.selectable-image').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected');
    document.getElementById('selectedImageResult').textContent = `Selected: ${img.alt}`;
    selectedImageSrc = img.getAttribute('src');  // track the chosen image
  });
});

// UNCHANGED: Form element references
let form = document.getElementById("form");
let exerciseName = document.getElementById("exerciseName");
let msg = document.getElementById("msg");
let bodyParts = document.getElementById("bodyParts");
let resistance = document.getElementById("resistance");
let reps = document.getElementById("reps");
let description = document.getElementById("description");
let exercises = document.getElementById("exercises");

// UNCHANGED: Form submission
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  formValidation();
})

// UNCHANGED: Form validation
let formValidation = ()=> {
  if (exerciseName.value.trim() === "") {
    console.log('failure');
    msg.innerHTML = "Exercise Cannot be Blank";
  }
  else {
    console.log('success');
    msg.innerHTML = "";
    acceptData();
  }
}

let data = {};
let selectedImageSrc = "";
let editingExerciseId = null; // NEW: Track if we're editing an existing exercise

// UPDATED: Now handles both create and update operations
let acceptData = () => {
  // NEW: Create a fresh data object to avoid reference issues
  data = {
    "exerciseName": exerciseName.value,
    "bodyParts": bodyParts.value,
    "resistanceOption": resistance.value,
    "repsOption": reps.value,
    "description": description.value,
    "image": selectedImageSrc  // include image selection
  };
  
  console.log('Accept data called with:', data);

  // NEW: Check if we're editing or creating
  if (editingExerciseId) {
    updateExercise(); // NEW: Update existing exercise in database
  } else {
    createExercises(); // Create new exercise
  }

  // Close the Bootstrap modal programmatically
  const modalElement = document.getElementById('form');
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }
};

// UPDATED: Now saves to Dexie database instead of just DOM manipulation
let createExercises = async ()=> {
  try {
    console.log('Creating exercise with data:', data);
    
    // NEW: Add timestamp for creation
    data["createdAt"] = new Date();
    
    // NEW: Clear any existing error messages
    msg.innerHTML = "";
    
    // NEW: Save to Dexie database instead of just creating DOM
    const id = await db.exercises.add(data);
    console.log('Exercise saved to database with ID:', id);
    
    // NEW: Reload all exercises from database to refresh display
    await loadExercisesFromDB();
    
    resetForm();
  } catch (error) {
    console.error('Detailed error saving exercise:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    // Show specific error message
    if (error.name === 'ConstraintError') {
      msg.innerHTML = "Database constraint error. Please check your data.";
    } else if (error.name === 'DataError') {
      msg.innerHTML = "Invalid data format. Please check all fields.";
    } else {
      msg.innerHTML = `Error saving exercise: ${error.message}`;
    }
  }
}

// NEW: Function to load and display all exercises from database
async function loadExercisesFromDB() {
  try {
    // NEW: Get all exercises from database
    const allExercises = await db.exercises.orderBy('createdAt').reverse().toArray();
    
    // NEW: Clear existing display
    exercises.innerHTML = '';
    
    // NEW: Create DOM elements for each exercise from database
    allExercises.forEach(exercise => {
      exercises.innerHTML += `
        <div class="card p-3 mb-3" data-exercise-id="${exercise.id}">
              <span class="d-flex justify-content-between align-items-start">
                <span class="fw-bold">${exercise.exerciseName}</span>
                <button class="btn btn-primary btn-sm add-to-routine-btn">Add to Routine</button>
              </span>

              <div class="mt-2">
                <span><em>Body Parts: &nbsp</em>${exercise.bodyParts}</span>
              </div>

              <span class="mt-2 d-flex justify-content-center gap-4 flex-wrap">
                <span class = "text-secondary">
                  <strong>Spring Resistance:</strong>
                  <span class="badge bg-secondary">${exercise.resistanceOption}</span>
                </span>
                <span class = "text-secondary">
                  <strong>Number of Repetitions:</strong>
                  <span class="badge bg-secondary">${exercise.repsOption}</span>
                </span>
              </span>

              <div>
                <p class="mt-2"><em>Description:&nbsp</em> ${exercise.description}</p>
              </div>

              <span style="display: flex; justify-content: center; align-items: center;">
                <span class="my-2">
                  <img src="${exercise.image}" alt="Exercise Image" style="width: 200px; height: 200px; border-radius: 9px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);">
                </span>
              </span>

              <!-- Centered icons -->
                <span class="options d-flex justify-content-center gap-5 mt-2">
                  <i onClick="editExercise(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square" title="Edit Exercise"></i>
                  <i onClick="deleteExercise(this)" class="fa-solid fa-trash" title="Delete Exercise"></i>
                </span>

            </div>`;
    });
  } catch (error) {
    console.error('Error loading exercises:', error);
  }
}

// UPDATED: Now deletes from Dexie database instead of just removing DOM
let deleteExercise = async (e) => {
  try {
    // NEW: Get the exercise ID from the card's data attribute
    const card = e.parentElement.parentElement;
    const exerciseId = parseInt(card.getAttribute('data-exercise-id'));
    
    if (exerciseId) {
      // NEW: Delete from database
      await db.exercises.delete(exerciseId);
      console.log('Exercise deleted from database');
      
      // NEW: Reload exercises to refresh display
      await loadExercisesFromDB();
    } else {
      // OLD: Fallback to DOM removal if no ID found
      card.remove();
    }
  } catch (error) {
    console.error('Error deleting exercise:', error);
    // Fallback to DOM removal on error
    e.parentElement.parentElement.remove();
  }
}

// UPDATED: Now prepares for database update instead of just DOM manipulation
let editExercise = (e) => {
  let selectedExercise = e.parentElement.parentElement;
  
  // NEW: Get the exercise ID for updating
  editingExerciseId = parseInt(selectedExercise.getAttribute('data-exercise-id'));

  // Exercise Name (inside first span -> first child span)
  exerciseName.value = selectedExercise.querySelector('.fw-bold').textContent.trim();

  // Body Parts (inside second div, extract the text after the label)
  let bodyPartsText = selectedExercise.querySelector('.mt-2 span').textContent;
  bodyParts.value = bodyPartsText.replace('Body Parts: \xa0', '').trim();

  // Resistance and Reps (extract from badges)
  let badges = selectedExercise.querySelectorAll('.badge');
  resistance.value = badges[0].textContent.trim();
  reps.value = badges[1].textContent.trim();

  // Description (strip label)
  let descriptionText = selectedExercise.querySelector('p').textContent;
  description.value = descriptionText.replace(/^Description:\s*/, '').trim();

  // Image src
  let img = selectedExercise.querySelector('img');
  if (img) {
    selectedImageSrc = img.getAttribute('src');

    // Highlight the selected image in the picker
    document.querySelectorAll('.selectable-image').forEach(i => {
      i.classList.remove('selected');
      if (i.getAttribute('src') === selectedImageSrc) {
        i.classList.add('selected');
        document.getElementById('selectedImageResult').textContent = `Selected: ${i.alt}`;
      }
    });
  }

  // REMOVED: No longer remove the card here, we'll update it in database
};

// NEW: Function to update existing exercise in database
async function updateExercise() {
  try {
    // NEW: Update the exercise in database
    await db.exercises.update(editingExerciseId, {
      exerciseName: data.exerciseName,
      bodyParts: data.bodyParts,
      resistanceOption: data.resistanceOption,
      repsOption: data.repsOption,
      description: data.description,
      image: data.image
    });
    
    console.log('Exercise updated in database');
    
    // NEW: Reset editing state
    editingExerciseId = null;
    
    // NEW: Reload exercises to refresh display
    await loadExercisesFromDB();
    
    resetForm();
  } catch (error) {
    console.error('Error updating exercise:', error);
    msg.innerHTML = "Error updating exercise. Please try again.";
  }
}

// UPDATED: Added reset of editing state
let resetForm = ()=> {
  exerciseName.value = "";
  bodyParts.value = "";
  resistance.value = "";
  reps.value = "";
  description.value = "";
  selectedImageSrc = "";
  editingExerciseId = null; // NEW: Reset editing state

  // Hide image picker
  document.getElementById('imagePicker').style.display = 'none';

  // Deselect any selected images
  document.querySelectorAll('.selectable-image').forEach(img => {
    img.classList.remove('selected');
  });

  // Clear selected image text
  document.getElementById('selectedImageResult').textContent = '';
}

// REMOVED: Temporary in-memory array - now using Dexie database
// const savedRoutines = [];

// NEW: Load saved routines from database
async function loadRoutinesFromDB() {
  // This function will be used by populateRoutinesModal
}

// UPDATED: Save Routine to Dexie database instead of memory array
document.getElementById('saveRoutineBtn').addEventListener('click', async () => {
  const routineItems = document.querySelectorAll('#routineList li');
  const routine = [];

  routineItems.forEach(item => routine.push(item.textContent.trim()));

  if (routine.length > 0) {
    try {
      // NEW: Save to Dexie database instead of memory array
      await db.routines.add({
        exercises: routine,
        createdAt: new Date()
      });
      
      console.log('Routine saved to database');
      alert('Routine saved!');
    } catch (error) {
      console.error('Error saving routine:', error);
      alert('Error saving routine. Please try again.');
    }
  } else {
    alert('No exercises to save.');
  }
});

// UNCHANGED: Clear Routine
document.getElementById('clearRoutineBtn').addEventListener('click', () => {
  const list = document.getElementById('routineList');
  list.innerHTML = '';
});

// UPDATED: Function to populate routines modal from Dexie database
async function populateRoutinesModal() {
  const modalContent = document.getElementById('routinesModalContent');
  
  try {
    // NEW: Get all routines from database instead of memory array
    const savedRoutines = await db.routines.orderBy('createdAt').reverse().toArray();
    
    if (savedRoutines.length === 0) {
      modalContent.innerHTML = '<p class="text-muted text-center">No saved routines found.</p>';
      return;
    }

    let html = '';
    savedRoutines.forEach((routine, index) => {
      html += `
        <div class="routine-item">
          <h6><strong>Routine ${index + 1}</strong></h6>
          <div class="routine-exercises">
            <strong>Exercises:</strong> ${routine.exercises.join(', ')}
          </div>
          <small class="text-muted">${routine.exercises.length} exercise${routine.exercises.length !== 1 ? 's' : ''}</small>
        </div>
      `;
    });
    
    modalContent.innerHTML = html;
  } catch (error) {
    console.error('Error loading routines:', error);
    modalContent.innerHTML = '<p class="text-danger text-center">Error loading routines.</p>';
  }
}

// UNCHANGED: Event listener for when the modal is about to be shown
document.getElementById('routinesModal').addEventListener('show.bs.modal', function() {
  populateRoutinesModal();
});