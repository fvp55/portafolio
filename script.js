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
