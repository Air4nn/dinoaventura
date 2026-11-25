// carrusel.js : carrusel dinamico de la galeria (galeria.html). Lee las fotos de GALERIA (galeria.js),
// crea una diapositiva por foto y las mueve con transform. Funciona con botones, puntos, flechas del
// teclado y deslizando el dedo. Si GALERIA esta vacia muestra 3 espacios de ejemplo con el logo.
(function () {
  const pista = $("#carruselPista");
  if (!pista) return;
  // Si galeria.js tiene un error de sintaxis, GALERIA no existe: se usan los espacios de ejemplo en vez de romper la pagina.
  const lista = typeof GALERIA !== "undefined" ? GALERIA : [];
  const fotos = lista.length ? lista : [
    { titulo: "Aquí irá tu primera foto", texto: "Agrega tus imágenes en js/galeria.js", vacia: true },
    { titulo: "Cumpleaños, baby showers y más", texto: "Cada foto de la lista es una diapositiva", vacia: true },
    { titulo: "Diversión prehistórica", texto: "Sigue la guía GUIA.md, paso 2", vacia: true }
  ];
  let actual = 0, reloj = null;

  pista.innerHTML = fotos.map((f, i) => `
    <figure class="diapo${f.vacia ? " sin-foto" : ""}" role="group" aria-roledescription="diapositiva" aria-label="${i + 1} de ${fotos.length}">
      <img src="${f.vacia ? "img/logo-principal.png" : f.archivo}" alt="${f.vacia ? "" : f.titulo}"${i ? ' loading="lazy"' : ""}>
      <figcaption><b>${f.titulo}</b>${f.texto ? `<br>${f.texto}` : ""}</figcaption>
    </figure>`).join("");

  const puntos = $("#carruselPuntos");
  puntos.innerHTML = fotos.map((f, i) => `<button type="button" aria-label="Ir a la foto ${i + 1}"></button>`).join("");
  const botones = [...puntos.children];

  function ir(n) {                                         // mueve la pista y marca el punto activo
    actual = (n + fotos.length) % fotos.length;
    pista.style.transform = `translateX(-${actual * 100}%)`;
    botones.forEach((b, i) => b.setAttribute("aria-current", i === actual));
  }
  function parar() { clearInterval(reloj); reloj = null; }
  function arrancar() {                                    // cambia sola cada 5 s (salvo si se pidieron menos animaciones)
    if (fotos.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    parar(); reloj = setInterval(() => ir(actual + 1), 5000);
  }
  const raiz = $("#carrusel");
  if (fotos.length < 2) { raiz.querySelectorAll(".car-btn").forEach((b) => (b.hidden = true)); puntos.hidden = true; }

  raiz.querySelector(".car-prev").addEventListener("click", () => { parar(); ir(actual - 1); });
  raiz.querySelector(".car-next").addEventListener("click", () => { parar(); ir(actual + 1); });
  botones.forEach((b, i) => b.addEventListener("click", () => { parar(); ir(i); }));
  raiz.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { parar(); ir(actual - 1); }
    if (e.key === "ArrowRight") { parar(); ir(actual + 1); }
  });
  raiz.addEventListener("mouseenter", parar);
  raiz.addEventListener("mouseleave", () => { if (!raiz.matches(":focus-within")) arrancar(); });
  let x0 = null;                                           // deslizar con el dedo
  raiz.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; parar(); }, { passive: true });
  raiz.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) ir(actual + (dx < 0 ? 1 : -1));
  });
  ir(0);
  arrancar();
})();
