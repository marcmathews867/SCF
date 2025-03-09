
// Start Typing Effect --------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.querySelector(".typing h1");
  const text = textElement.innerText; // Get original text
  textElement.innerText = ""; // Clear text initially
  let index = 0;
  function typeEffect() {
      if (index < text.length) {
          textElement.innerText += text[index];
          index++;
          setTimeout(typeEffect, 50); // Adjust speed (lower is faster)
      }
  }
  typeEffect(); // call function
});

// End Typing Effect --------------------------------------------------------------------------------


// Start Popup Project text --------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".project1 img, .project2 img").forEach(img => {
      img.addEventListener("click", function () {
          let hiddenText = this.nextElementSibling.nextElementSibling; // Target hidden text
          hiddenText.style.display = hiddenText.style.display === "block" ? "none" : "block";
      });
  });
});

// End Popup Project text --------------------------------------------------------------------------------


// Start Bottom Cycling Section ---------------------------------

// Get all testimonials divs
const testimonials = document.querySelectorAll("#testimonials div");
let currentIndex = 0;
// Function to show the next testimonial
function showNextTestimonial() {
  testimonials.forEach(testimonial => testimonial.style.display = 'none');  // Hide all testimonials
  testimonials[currentIndex].style.display = 'block';  // Show current testimonial
  //console.log("Showing testimonial index: " + currentIndex);  // Log current index for debugging
  currentIndex = (currentIndex + 1) % testimonials.length;  // Increment index, reset to 0 if out of bounds
}
showNextTestimonial();// Initially show first testimonial
setInterval(showNextTestimonial, 3000);// Change testimonial every 3 seconds

// End Bottom Cycling Section ------------------------------------
