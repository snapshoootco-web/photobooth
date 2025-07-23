function takePhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.filter = filterSelect.value;

  // Mirror the captured image
  context.save();
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  context.restore();

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
