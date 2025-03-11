const API_URL = 'https://script.google.com/macros/s/AKfycbzFu5JieloYqT_hMg7wqNpx_bL64y3-84YoRFP9GAl56mSr54hjmPR71s3kjblrNJxM/exec'; // Replace with your actual URL

// Store the selected star rating
let selectedRating = 0;

document.getElementById('starRating').addEventListener('click', function(e) {
  if (e.target.tagName.toLowerCase() === 'span') {
    selectedRating = parseInt(e.target.getAttribute('data-value'));
    updateStars();
  }
});

function updateStars() {
  const stars = document.querySelectorAll('#starRating span');
  stars.forEach(star => {
    star.classList.remove('selected');
    star.style.color = "#ddd"; // Reset all stars to gray
  });

  for (let i = 0; i < selectedRating; i++) {
    stars[i].classList.add('selected');
    stars[i].style.color = "gold"; // Highlight selected stars
  }
}

document.getElementById('reviewForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent page reload
  
    console.log('Form submitted!');  // Debugging line to check if the form is triggered
  
    const name = document.getElementById('name').value;
    const review = document.getElementById('review').value;
    const product = document.getElementById('productSelect').value;
  
    if (selectedRating === 0) {
      alert('Please select a star rating!');
      return;
    }
  
    // Check if all fields are filled in
    if (!name || !review || !product) {
      alert('Please fill in all fields!');
      return;
    }
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ name, review, rating: selectedRating, product }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // Log the full response to debug
      const result = await response.json();
      console.log(result);  // Debugging line to log the response from the server
  
      if (result.status === 'success') {
        alert('Review submitted!');
        window.location.href = "review-submitted.html"; // Redirect to the 'Review Submitted' page
      } else {
        alert('Error: ' + result.message);  // Show the error message from the server
      }
    } catch (error) {
      console.error('Error:', error);  // Log any errors that occur during submission
      alert('There was an error submitting your review.');
    }
  });
  

async function loadReviews() {
  const response = await fetch(API_URL);
  const reviews = await response.json();
  const list = document.getElementById('reviewsList');
  list.innerHTML = ''; // Clear reviews

  reviews.reverse().forEach(r => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');
    reviewElement.innerHTML = `
      <strong>${r.name}</strong> reviewed <em>${r.product}</em><br>
      <p>${r.review}</p>
      <p class="rating">${'&#9733;'.repeat(r.rating)}${'&#9733;'.repeat(5 - r.rating).replace(/★/g, '☆')}</p>
      <em>(${new Date(r.timestamp).toLocaleString()})</em>
    `;
    list.appendChild(reviewElement);
  });
}

window.onload = loadReviews;