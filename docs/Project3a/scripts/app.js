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
    // You can also save img.src to a hidden input for form submission
  });
});

