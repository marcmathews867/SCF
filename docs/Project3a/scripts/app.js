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
    // can also save img.src to a hidden input for form submission
  });
});

let form = document.getElementById("form");
let exerciseName = document.getElementById("exerciseName");
let msg = document.getElementById("msg");

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
  }
}