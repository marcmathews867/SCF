/*document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-routine-btn')) {
    const exerciseName = e.target.getAttribute('data-name');

    // Create list item in the routine section
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = exerciseName;

    document.getElementById('routineList').appendChild(li);
  }
});
*/

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

document.querySelectorAll('.selectable-image').forEach(img => {
  img.addEventListener('click', () => {
    document.querySelectorAll('.selectable-image').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected');
    document.getElementById('selectedImageResult').textContent = `Selected: ${img.alt}`;
    selectedImageSrc = img.getAttribute('src');  // track the chosen image
  });
});

let form = document.getElementById("form");
let exerciseName = document.getElementById("exerciseName");
let msg = document.getElementById("msg");
let bodyParts = document.getElementById("bodyParts");
let resistance = document.getElementById("resistance");
let reps = document.getElementById("reps");
let description = document.getElementById("description");
let exercises = document.getElementById("exercises");

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  formValidation();
})

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

let acceptData = () => {
  data["exerciseName"] = exerciseName.value;
  data["bodyParts"] = bodyParts.value;
  data["resistanceOption"] = resistance.value;
  data["repsOption"] = reps.value;
  data["description"] = description.value;
  data["image"] = selectedImageSrc;  // include image selection
  //console.log(data);

  createExercises();

  // Close the Bootstrap modal programmatically
const modalElement = document.getElementById('form');
const modalInstance = bootstrap.Modal.getInstance(modalElement);
if (modalInstance) {
  modalInstance.hide();
}
};

let createExercises = ()=> {
  exercises.innerHTML += `
  <div class="card p-3 mb-3">
        <span class="d-flex justify-content-between align-items-start">
          <span class="fw-bold">${data.exerciseName}</span>
          <button class="btn btn-primary btn-sm add-to-routine-btn">Add to Routine</button>
        </span>

        <div class="mt-2">
          <span><em>Body Parts: &nbsp</em>${data.bodyParts}</span>
        </div>

        <span class="mt-2 d-flex justify-content-center gap-4 flex-wrap">
          <span class = "text-secondary">
            <strong>Spring Resistance:</strong>
            <span class="badge bg-secondary">${data.resistanceOption}</span>
          </span>
          <span class = "text-secondary">
            <strong>Number of Repetitions:</strong>
            <span class="badge bg-secondary">${data.repsOption}</span>
          </span>
        </span>

        <div>
          <p class="mt-2"><em>Description:&nbsp</em> ${data.description}</p>
        </div>

        <span style="display: flex; justify-content: center; align-items: center;">
          <span class="my-2">
            <img src="${data.image}" alt="Exercise Image" style="width: 200px; height: 200px; border-radius: 9px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);">
          </span>
        </span>

        <!-- Centered icons -->
          <span class="options d-flex justify-content-center gap-5 mt-2">
            <i onClick="editExercise(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square" title="Edit Exercise"></i>
            <i onClick="deleteExercise(this)" class="fa-solid fa-trash" title="Delete Exercise"></i>
          </span>

      </div>
  `;
  resetForm();
}

let deleteExercise = (e)=> {
  e.parentElement.parentElement.remove();
}

let editExercise = (e) => {
  let selectedExercise = e.parentElement.parentElement;

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

  // Remove the current card so the updated one can replace it
  selectedExercise.remove();
};


let resetForm = ()=> {
  exerciseName.value = "";
  bodyParts.value = "";
  resistance.value = "";
  reps.value = "";
  description.value = "";
  selectedImageSrc = "";

  // Hide image picker
  document.getElementById('imagePicker').style.display = 'none';

  // Deselect any selected images
  document.querySelectorAll('.selectable-image').forEach(img => {
    img.classList.remove('selected');
  });

  // Clear selected image text
  document.getElementById('selectedImageResult').textContent = '';
}

// Temporary in-memory array of saved routines
  const savedRoutines = [];

  // Save Routine
  document.getElementById('saveRoutineBtn').addEventListener('click', () => {
    const routineItems = document.querySelectorAll('#routineList li');
    const routine = [];

    routineItems.forEach(item => routine.push(item.textContent.trim()));

    if (routine.length > 0) {
      savedRoutines.push(routine); // Save a copy
      alert('Routine saved!');
    } else {
      alert('No exercises to save.');
    }
  });

  // Clear Routine
  document.getElementById('clearRoutineBtn').addEventListener('click', () => {
    const list = document.getElementById('routineList');
    list.innerHTML = '';
  });

  /*// Show Routines
  document.getElementById('showRoutinesBtn').addEventListener('click', () => {
    if (savedRoutines.length === 0) {
      alert('No saved routines yet.');
      return;
    }

    let message = 'Saved Routines:\n\n';
    savedRoutines.forEach((routine, index) => {
      message += `Routine ${index + 1}:\n- ${routine.join('\n- ')}\n\n`;
    });

    alert(message);
  });*/

  // Function to populate the routines modal - ADD THIS NEW FUNCTION
function populateRoutinesModal() {
  const modalContent = document.getElementById('routinesModalContent');
  
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
          <strong>Exercises:</strong> ${routine.join(', ')}
        </div>
        <small class="text-muted">${routine.length} exercise${routine.length !== 1 ? 's' : ''}</small>
      </div>
    `;
  });
  
  modalContent.innerHTML = html;
}

// Event listener for when the modal is about to be shown - ADD THIS NEW EVENT LISTENER
document.getElementById('routinesModal').addEventListener('show.bs.modal', function() {
  populateRoutinesModal();
});
