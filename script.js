document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  var toggleBtn = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');

  /* ===== MODO OSCURO ===== */
  function guardarTema(valor) {
    try { localStorage.setItem('theme', valor); } catch (e) { /* sin almacenamiento */ }
  }

  function leerTema() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function aplicarTema(oscuro) {
    body.classList.toggle('dark', oscuro);
    themeIcon.classList.toggle('fa-moon', !oscuro);
    themeIcon.classList.toggle('fa-sun', oscuro);
    toggleBtn.setAttribute(
      'aria-label',
      oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
  }

  // Tema inicial: preferencia guardada o, si no hay, la del dispositivo
  var guardado = leerTema();
  var prefiereOscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  aplicarTema(guardado ? guardado === 'dark' : prefiereOscuro);

  // Botón de cambio de tema
  toggleBtn.addEventListener('click', function () {
    var oscuro = !body.classList.contains('dark');
    aplicarTema(oscuro);
    guardarTema(oscuro ? 'dark' : 'light');
  });

  // Si el dispositivo cambia de modo y no hay elección guardada, lo seguimos
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var alCambiar = function (e) {
      if (!leerTema()) { aplicarTema(e.matches); }
    };
    if (mq.addEventListener) { mq.addEventListener('change', alCambiar); }
    else if (mq.addListener) { mq.addListener(alCambiar); }
  }

  /* ===== SCROLL SUAVE ===== */
  var menu = document.getElementById('menuPrincipal');

  document.querySelectorAll('a[href^="#"]').forEach(function (enlace) {
    enlace.addEventListener('click', function (e) {
      var destino = enlace.getAttribute('href');
      if (destino.length < 2) { return; } // enlaces "#" vacíos (Ver Proyecto)
      var seccion = document.querySelector(destino);
      if (!seccion) { return; }
      e.preventDefault();
      seccion.scrollIntoView({ behavior: 'smooth' });

      // Cierra el menú en celular al elegir una sección
      if (menu && menu.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* ===== FORMULARIO ===== */
  var formulario = document.getElementById('contactForm');
  if (formulario) {
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('¡Mensaje enviado! 📧');
      formulario.reset();
    });
  }
});