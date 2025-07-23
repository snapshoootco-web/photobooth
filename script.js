const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const snapButton = document.getElementById('snap');
const filterSelect = document.getElementById('filter');
const photos = document.getElementById('photos');
const countdown = document.getElementById('countdown');

// Access the webcam
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    alert("Error accessing camera: " + err.message);
  });

// Countdown before snapping
function startCountdown(seconds, callback) {
  let count = seconds;
  countdown.style.display = 'block';
  countdown.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count <= 0) {
      clearInterval(interval);
      countdown.style.display = 'none';
      callback();
    } else {
      countdown.textContent = count;
    }
  }
