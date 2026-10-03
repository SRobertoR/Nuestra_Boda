// Desactivar la restauración automática del scroll del navegador al recargar
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Forzar el scroll hasta arriba al cargar/recargar la página
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. REPRODUCTOR DE AUDIO ---
    const audio = document.getElementById("bg-audio");
    const playBtn = document.getElementById("play-btn");
    const playIcon = document.getElementById("play-icon");
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");

    const playSVG = `<path d="M8 5v14l11-7z"/>`;
    const pauseSVG = `<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>`;

    if (playBtn && audio) {
        playBtn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play();
                playIcon.innerHTML = pauseSVG;
            } else {
                audio.pause();
                playIcon.innerHTML = playSVG;
            }
        });

        audio.addEventListener("timeupdate", () => {
            if (audio.duration) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = `${progressPercent}%`;
            }
        });

        progressContainer.addEventListener("click", (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;

            if (duration) {
                audio.currentTime = (clickX / width) * duration;
            }
        });
    }


    // --- 2. CARRUSEL DE GALERÍA ---
    const track = document.getElementById("carousel-track");
    if (track) {
        const slides = Array.from(track.children);
        const nextBtn = document.getElementById("nextBtn");
        const prevBtn = document.getElementById("prevBtn");
        let currentIndex = 0;

        const updateCarousel = (index) => {
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel(currentIndex);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel(currentIndex);
            });
        }
    }


    // --- 3. CUENTA REGRESIVA ---
    const targetDate = new Date("October 17, 2026 16:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const daysElem = document.getElementById("days");
            const hoursElem = document.getElementById("hours");
            const minutesElem = document.getElementById("minutes");
            const secondsElem = document.getElementById("seconds");

            if (daysElem) daysElem.innerText = String(days).padStart(2, '0');
            if (hoursElem) hoursElem.innerText = String(hours).padStart(2, '0');
            if (minutesElem) minutesElem.innerText = String(minutes).padStart(2, '0');
            if (secondsElem) secondsElem.innerText = String(seconds).padStart(2, '0');
        }
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();


    // --- 4. ANIMACIÓN AL HACER SCROLL (CONECTADO A TU CSS) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Activa la animación una sola vez
            }
        });
    }, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach(element => revealOnScroll.observe(element));


    

});