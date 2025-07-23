const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const photos = document.getElementById('photos');
const countdownEl = document.getElementById('countdown');
const filterSelect = document.getElementById('filter');
const context = canvas.getContext('2d');

// Start webcam
navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(err => alert("Camera error: " + err.message));

// Update video filter when changed
filterSelect.addEventListener('change', () => {
  video.style.filter = filterSelect.value;
});

// Countdown before photo
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

// Take a photo
function takePhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.filter = filterSelect.value;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageDataURL = canvas.toDataURL('image/png');

  const photoContainer = document.createElement('div');
  const img = document.createElement('img');
  img.src = imageDataURL;

  const downloadBtn = document.createElement('a');
  downloadBtn.textContent = '⬇️ Download';
  downloadBtn.href = imageDataURL;
  downloadBtn.download = 'snapshot.png';
  downloadBtn.className = 'download-btn';

  photoContainer.appendChild(img);
  photoContainer.appendChild(downloadBtn);
  photos.prepend(photoContainer);
}
