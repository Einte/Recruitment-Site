      const slides = document.querySelectorAll('.top-slide');
        let activeSlideIndex = 0;

        function advanceHeroSlider() {
            slides[activeSlideIndex].classList.remove('is-active');
            activeSlideIndex = (activeSlideIndex + 1) % slides.length;
            slides[activeSlideIndex].classList.add('is-active');
        }
        setInterval(advanceHeroSlider, 5000);
    
        (function () {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                document.documentElement.classList.add('light-mode-init');
            }
        })();