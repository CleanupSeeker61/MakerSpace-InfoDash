async function initSwiper() {
  const res = await fetch('/images');
  const images = await res.json();

  const wrapper = document.getElementById('swiper-wrapper');
  const imagesPerBlock = 5;

  images.forEach((img, index) => {
    if (index % imagesPerBlock === 0) {
      const iframeSlide = document.createElement('div');
      iframeSlide.className = 'swiper-slide';
      iframeSlide.setAttribute('data-swiper-autoplay', '20000');

      iframeSlide.innerHTML = `
        <iframe
          src="https://bahn.expert/Heilbronn%20Neckar-Turm%2FK.-S.-Pl" tabindex="-1" class="test2">
        </iframe>
      `;

      wrapper.appendChild(iframeSlide);
      console.log("iframe added at " + index);
    }

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.style.backgroundImage = `url(images/${img})`;
    slide.setAttribute('data-swiper-autoplay', '5000');
    wrapper.appendChild(slide);
    console.log("image added at " + index);
  });

  new Swiper('.swiper', {
    loop: true,
    effect: 'slide',
    speed: 1000,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false
    }
  });

  swiper.on('slideChangeTransitionENd', () => {
    swiper.autoplay.start();
  });
}

initSwiper();


