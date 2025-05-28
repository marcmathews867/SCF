document.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-to-routine-btn')) {
    const exerciseName = e.target.getAttribute('data-name');

    // Create list item in the routine section
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
            <i class="fa-solid fa-pen-to-square" title="Edit Exercise"></i>
            <i onClick="deleteExercise(this)" class="fa-solid fa-trash" title="Delete Exercise"></i>
          </span>

      </div>
  `;
  resetForm();
}

let deleteExercise = (e)=> {
  e.parentElement.parentElement.remove();
}

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