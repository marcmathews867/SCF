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
  console.log(data);
};