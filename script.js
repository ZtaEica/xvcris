document.addEventListener('DOMContentLoaded', () => {
  // --- VARIABLES ---
  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainContent = document.getElementById('main-content');

  // --- 1. ENTRADA AL SITIO ---
  window.enterSite = function () {
    // Hacemos la función global para el onclick
    welcomeScreen.style.opacity = '0';

    // Reproducir música (Necesario interacción de usuario)
    music
      .play()
      .then(() => {
        musicBtn.classList.add('anim-spin');
      })
      .catch((err) => {
        console.log('Autoplay bloqueado, usuario debe tocar botón música');
      });
    music.volume = 0.3;

    setTimeout(() => {
      welcomeScreen.style.display = 'none';
      mainContent.classList.add('visible');
      startCountdown(); // Inicia contador solo al entrar
    }, 800);
  };

  // --- 2. CONTROL DE MÚSICA ---
  window.toggleMusic = function () {
    if (music.paused) {
      music.play();
      musicBtn.classList.add('anim-spin');
      musicBtn.innerHTML = '<i class="fas fa-music"></i>';
      musicBtn.style.opacity = '1';
    } else {
      music.pause();
      musicBtn.classList.remove('anim-spin');
      musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
      musicBtn.style.opacity = '0.7';
    }
  };

  // --- 3. ANIMACIONES SCROLL (Intersection Observer Eficiente) ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Dejar de observar para ahorrar recursos
        }
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll('.fade-element')
    .forEach((el) => observer.observe(el));

  // --- 4. CONTADOR REGRESIVO ---
  function startCountdown() {
    // FECHA: 14 Marzo 2026, 12:00 PM
    const targetDate = new Date('March 14, 2026 12:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        document.getElementById('countdown').innerHTML =
          "<div style='grid-column: span 4'>¡ES HOY!</div>";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Actualización segura
      if (document.getElementById('days')) {
        document.getElementById('days').innerText = String(days).padStart(
          2,
          '0'
        );
        document.getElementById('hours').innerText = String(hours).padStart(
          2,
          '0'
        );
        document.getElementById('minutes').innerText = String(minutes).padStart(
          2,
          '0'
        );
        document.getElementById('seconds').innerText = String(seconds).padStart(
          2,
          '0'
        );
      }
    }, 1000);
  }
});
