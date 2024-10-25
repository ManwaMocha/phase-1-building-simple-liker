// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Get modal and its inner element for the error
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');

// Hide modal when page starts
modal.classList.add('hidden'); // Removed the dot before 'hidden'

// Function to show error when called
function showError(message) {
  modalMessage.textContent = message; // Changed 'textcontent' to 'textContent'
  // Unhide the message when called
  modal.classList.remove('hidden');

  // We want error to disappear after 3 seconds
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 3000);
}

// Function to handle click heart event in event listener
function handleHeartClick(event) {
  const heart = event.currentTarget.querySelector('.like-glyph'); // Fixed selector

  mimicServerCall()
    .then(() => {
      // Activate the heart when clicked
      heart.textContent = FULL_HEART;
      heart.classList.add('activated-heart'); // Fixed 'classlist' to 'classList'
    })
    .catch((error) => {
      // Call error modal
      showError(error);
    });
}

// Event listener for all like buttons
document.querySelectorAll('.like').forEach((likeButton) => {
  likeButton.addEventListener('click', (event) => {
    const heart = event.currentTarget.querySelector('.like-glyph'); // Fixed selector

    if (heart.textContent === EMPTY_HEART) {
      handleHeartClick(event);
    } else { // Fixed condition
      heart.textContent = EMPTY_HEART; // Fixed typo 'eart'
      heart.classList.remove('activated-heart'); // Fixed 'classlist' to 'classList'
    }
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
