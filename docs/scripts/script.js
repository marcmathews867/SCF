// Start Bottom Cycling Section ---------------------------------
// Get all testimonials divs
const testimonials = document.querySelectorAll("#testimonials div");

// Set initial index
let currentIndex = 0;

// Function to show the next testimonial
function showNextTestimonial() {
  // Hide all testimonials
  testimonials.forEach(testimonial => testimonial.style.display = 'none');
  
  // Show the current testimonial
  testimonials[currentIndex].style.display = 'block';
  
  // Log the current index for debugging
  console.log("Showing testimonial index: " + currentIndex);
  
  // Increment the index, and reset to 0 if it's out of bounds
  currentIndex = (currentIndex + 1) % testimonials.length;
}

// Initially show the first testimonial
showNextTestimonial();

// Change testimonial every 3 seconds
setInterval(showNextTestimonial, 3000);
// End Bottom Cycling Section ------------------------------------


