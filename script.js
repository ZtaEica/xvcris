// --- LÓGICA DE JAVASCRIPT ---

const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const mainContent = document.getElementById('main-content');

// 1. Entrar al sitio
function enterSite() {
  welcomeScreen.style.opacity = '0';
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
    mainContent.classList.add('visible');

    // Iniciar contador cuando se entra al sitio
    startCountdown();
  }, 1000);
  playMusic();
}

// 2. Música
function toggleMusic() {
  if (music.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
}

function playMusic() {
  music.play().catch((e) => console.log('Audio play failed req interaction'));
  musicBtn.style.animationPlayState = 'running';
  musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
  music.volume = 0.2;
}

function pauseMusic() {
  music.pause();
  musicBtn.style.animationPlayState = 'paused';
  musicBtn.innerHTML = '<i class="fas fa-music"></i>';
}

// 3. Animación Scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-in-up').forEach((el) => {
  observer.observe(el);
});

// 4. NUEVO: Lógica del Contador
function startCountdown() {
  // FECHA OBJETIVO: 14 de Marzo 2026 a la 1:00 PM
  const targetDate = new Date('March 14, 2026 12:00:00').getTime();

  const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(timer);
      document.getElementById('countdown').innerHTML = '¡Hoy es el gran día!';
      return;
    }

    // Cálculos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar HTML
    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText =
      hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText =
      minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText =
      seconds < 10 ? '0' + seconds : seconds;
  }, 1000);
}
