// Select elements from the DOM
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const photos = document.getElementById('photos');
const countdownEl = document.getElementById('countdown');
const filterSelect = document.getElementById('filter');
const context = canvas.getContext('2d');

// Start the webcam
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => {
    alert("Error accessing camera: " + err.message);
  });

// Update video filter live
filterSelect.addEventListener('change', () => {
  video.style.filter = filterSelect.value;
});

// Countdown before taking a photo
snap.addEventListener('click', () => {
  let countdown = 3;
  countdownEl.style.display = 'block';
  countdownEl.textContent = countdown;

  const timer = setInterval(() => {
    countdown--;
    if (countdown === 0) {
      clearInterval(timer);
      countdownEl.style.display = 'none';
      takePhoto();
    } else {
      countdownEl.textContent = countdown;
    }
  }, 1000);
});

// Capture the photo
function takePhoto() {
  // Set canvas size
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Apply selected filter
  context.filter = filterSelect.value;

  // Draw current frame from video to canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Convert canvas to image URL
  const imageDataURL = canvas.toDataURL('image/png');

  // Create a container for photo + download button
  const photoContainer = document.createElement('div');

  const img = document.createElement('img');
  img.src = imageDataURL;

  const downloadBtn = document.createElement('a');
  downloadBtn.textContent = '⬇️ Download';
  downloadBtn.href = imageDataURL;
  downloadBtn.download = 'snapshot.png';
  downloadBtn.className = 'download-btn';

  // Append to the page
  photoContainer.appendChild(img);
  photoContainer.appendChild(downloadBtn);
  photos.prepend(photoContainer);
}
