// portfolio-carousel.js
// Controle de carrossel para cada projeto do portfólio

document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.portfolio-carousel');

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('.carousel-img');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    let current = 0;

    function showImage(idx) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === idx);
      });
    }

    prevBtn.addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    });

    nextBtn.addEventListener('click', () => {
      current = (current + 1) % images.length;
      showImage(current);
    });
  });
}); 