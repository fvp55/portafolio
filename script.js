document.addEventListener("DOMContentLoaded", () => {
  const themeSwitch = document.getElementById("themeSwitch");
  const body = document.body;
  const navbar = document.getElementById("mainNavbar");

  // Cambia clases de botones outline para mantener contraste
  function adjustOutlineButtons(mode) {
    document.querySelectorAll(".btn-outline-dark, .btn-outline-light").forEach(btn => {
      if (mode === "dark") {
        btn.classList.remove("btn-outline-dark");
        btn.classList.add("btn-outline-light");
      } else {
        btn.classList.remove("btn-outline-light");
        btn.classList.add("btn-outline-dark");
      }
    });
  }

  // Aplica el tema (atributo + clases para navbar y botones)
  function applyTheme(theme) {
    body.setAttribute("data-bs-theme", theme);
    themeSwitch.checked = (theme === "dark");

    if (theme === "dark") {
      navbar.classList.remove("navbar-light", "bg-white");
      navbar.classList.add("navbar-dark", "bg-dark");
    } else {
      navbar.classList.remove("navbar-dark", "bg-dark");
      navbar.classList.add("navbar-light", "bg-white");
    }

    adjustOutlineButtons(theme);
    localStorage.setItem("theme", theme);
  }

  // Carga preferencia guardada o la preferencia del sistema
  const saved = localStorage.getItem("theme") ||
                (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  applyTheme(saved);

  // Evento del switch
  themeSwitch.addEventListener("change", () => {
    applyTheme(themeSwitch.checked ? "dark" : "light");
  });
});

const body = document.body;
const hero = document.getElementById("hero");
const toggleBtn = document.getElementById("themeToggle");
const sky = document.querySelector(".sky");

// 🔹 Generar estrellas en el cielo
function createStars(numStars = 50) {
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    // Posición aleatoria
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";

    // Delay aleatorio para parpadeo
    star.style.animationDelay = Math.random() * 2 + "s";

    // Duración distinta para el desplazamiento (da variedad)
    const floatDuration = 40 + Math.random() * 40; // entre 40s y 80s
    star.style.animationDuration = `2s, ${floatDuration}s`;

    sky.appendChild(star);
  }
}
createStars(80); // 🔹 Genera 80 estrellas

// 🔹 Cambiar entre modos
toggleBtn.addEventListener("click", () => {
  hero.classList.toggle("night");
  hero.classList.toggle("day");
  body.classList.toggle("night");
  body.classList.toggle("day");

  if (hero.classList.contains("night")) {
    toggleBtn.textContent = "☀️ Cambiar a modo día";
    toggleBtn.classList.replace("btn-dark", "btn-light");
  } else {
    toggleBtn.textContent = "🌙 Cambiar a modo noche";
    toggleBtn.classList.replace("btn-light", "btn-dark");
  }
});


  // Animación de entrada al cargar la página
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.hero-title').style.opacity = '1';
  });

  // Animación al cambiar de modo claro/oscuro
  const themeToggle = document.getElementById('themeToggle');
  const heroTitle = document.querySelector('.hero-title');
  if (themeToggle && heroTitle) {
    themeToggle.addEventListener('click', () => {
      heroTitle.classList.remove('mode-switch-animate');
      // Forzar reflow para reiniciar animación
      void heroTitle.offsetWidth;
      heroTitle.classList.add('mode-switch-animate');
    });
  }
 
document.getElementById('themeToggle').addEventListener('click', function() {
  this.classList.add('mode-switch-animate');
  setTimeout(() => this.classList.remove('mode-switch-animate'), 700);
});

document.addEventListener('DOMContentLoaded', function() {
  const sky = document.querySelector('.hero .sky');
  
    function crearNube() {
    if (!document.body.classList.contains('night')) return; // Solo en modo noche
    const nube = document.createElement('div');
    nube.className = 'cloud';
    // Tamaño y opacidad aleatoria
    const width = Math.random() * 80 + 60;
    const height = width * (Math.random() * 0.4 + 0.6);
    nube.style.width = width + 'px';
    nube.style.height = height + 'px';
    nube.style.opacity = (Math.random() * 0.3 + 0.5).toFixed(2);
    // Posición vertical aleatoria
    nube.style.top = (Math.random() * 50 + 10) + '%';
    nube.style.left = '-200px';
    // Duración aleatoria
    const duracion = Math.random() * 25 + 25;
    nube.style.animation = `cloudMove ${duracion}s linear forwards`;
    sky.appendChild(nube);
    // Eliminar la nube cuando termine la animación
    nube.addEventListener('animationend', () => nube.remove());
  }

  // Generar nubes cada 3 segundos
  setInterval(crearNube, 3000);

  
});

// juego

  // --- JUEGO CLICKER ---
  const openClicker = document.getElementById('openClicker');
  const clickerGame = document.getElementById('clickerGame');
  const clickerScore = document.getElementById('clickerScore');
  const clickerCloud = document.getElementById('clickerCloud');
  const closeClicker = document.getElementById('closeClicker');
  let puntos = 0;

  if (openClicker && clickerGame && clickerScore && clickerCloud && closeClicker) {
    openClicker.addEventListener('click', () => {
      if (!document.body.classList.contains('day')) {
        alert('¡El juego solo está disponible en modo noche!');
        return;
      }
      puntos = 0;
      clickerScore.textContent = "Puntos: 0";
      clickerGame.style.display = 'block';
    });


    closeClicker.addEventListener('click', () => {
      clickerGame.style.display = 'none';
    });

    document.addEventListener('keydown', e => {
      if (e.code === 'Escape' && clickerGame.style.display === 'block') {
        clickerGame.style.display = 'none';
      }
    });

    // Ocultar el juego si cambias a modo noche
    const toggleBtn = document.getElementById('themeToggle');
    const hero = document.getElementById('hero');
    if (toggleBtn && hero) {
      toggleBtn.addEventListener("click", () => {
        if (hero.classList.contains("night")) {
          clickerGame.style.display = 'none';
        }
      });
    }
  };
 // 🔹 Delegación de evento: cualquier .cloud clickeada suma puntos
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cloud")) {
    if (clickerGame && clickerGame.style.display === "block") {
      puntos++;
      clickerScore.textContent = "Puntos: " + puntos;
      e.target.style.transform = "scale(1.15)";
      setTimeout(() => e.target.style.transform = "scale(1)", 100);
    }
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cloud")) {
    if (clickerGame && clickerGame.style.display === "block") {
      puntos++;
      clickerScore.textContent = "Puntos: " + puntos;

      // Animación rápida antes de eliminar
      e.target.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      e.target.style.transform = "scale(1.5)";
      e.target.style.opacity = "0";

      // Eliminar después de la animación
      setTimeout(() => e.target.remove(), 300);
    }
  }
});



      