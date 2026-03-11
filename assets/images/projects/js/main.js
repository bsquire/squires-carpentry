const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
const imageEls = Array.from(document.querySelectorAll('.project-image'));
const prevBtn = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
const nextBtn = lightbox ? lightbox.querySelector('.lightbox-next') : null;

let currentIndex = 0;

function getBgUrl(el) {
  const bg = getComputedStyle(el).backgroundImage;
  return bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
}

function openLightbox(index) {
  if (!lightbox || !lightboxImg || imageEls.length === 0) return;
  currentIndex = index;
  lightboxImg.src = getBgUrl(imageEls[currentIndex]);
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.style.display = 'none';
  lightboxImg.src = '';
}

function showNext() {
  if (!lightboxImg || imageEls.length === 0) return;
  currentIndex = (currentIndex + 1) % imageEls.length;
  lightboxImg.src = getBgUrl(imageEls[currentIndex]);
}

function showPrev() {
  if (!lightboxImg || imageEls.length === 0) return;
  currentIndex = (currentIndex - 1 + imageEls.length) % imageEls.length;
  lightboxImg.src = getBgUrl(imageEls[currentIndex]);
}

imageEls.forEach((el, index) => {
  el.addEventListener('click', () => openLightbox(index));
});

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
  });
}

document.addEventListener('keydown', (e) => {
  if (!lightbox || lightbox.style.display !== 'flex') return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});