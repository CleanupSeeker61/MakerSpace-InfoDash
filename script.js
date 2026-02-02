async function initSwiper() {
  const res = await fetch('/images');
  const images = await res.json();

  const wrapper = document.getElementById('swiper-wrapper');
  const imagesPerBlock = 5;

  images.forEach((img, index) => {
    if (index % imagesPerBlock === 0) {
      const iframeSlide = document.createElement('div');
      iframeSlide.className = 'swiper-slide iframe-slide';
      iframeSlide.setAttribute('data-swiper-autoplay', '20000');
      iframeSlide.setAttribute(
        'data-iframe',
        'https://dbf.finalrewind.org/5400137?efa=VVS&mode=infoscreen&limit=6'
      );

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

  let swiper;

  // --- delay Swiper init (kiosk-safe) ---
  setTimeout(() => {
    swiper = new Swiper('.swiper', {
      loop: true,
      speed: 1500,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      }
    });

    // create / destroy iframe on slide change
    swiper.on('slideChangeTransitionStart', () => {

      // remove all iframes
      swiper.slides.forEach(slide => {
        if (slide.classList.contains('iframe-slide')) {
          slide.innerHTML = '';
        }
      });

      const activeSlide = swiper.slides[swiper.activeIndex];

      // create iframe when iframe-slide becomes active
      if (activeSlide.classList.contains('iframe-slide')) {
        const src = activeSlide.dataset.iframe;

        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.tabIndex = -1;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';

        activeSlide.appendChild(iframe);
      }

      // kill focus (iframe safety)
      document.activeElement?.blur();
    });

    // never let autoplay die
    swiper.on('slideChangeTransitionEnd', () => {
      swiper.autoplay.start();
    });

    // initial safety update
    swiper.update();
    swiper.autoplay.start();
  }, 1500);
}

initSwiper();
